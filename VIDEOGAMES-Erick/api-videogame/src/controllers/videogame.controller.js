const axios = require("axios");
const { validate: isUuidV4 } = require('uuid');
const {Op} = require("sequelize")
const { Videogame, Genre } = require('../db.js');
const { API_KEY, URL_API } = process.env;


function mapper(results) {
	return results.map(videogame => {
		return {
			id: videogame.id,
			name: videogame.name,
			image: videogame.background_image,
			description: videogame.description_raw,
			released: videogame.released,
			rating: videogame.rating,
			platforms: videogame.platforms?.map(platform => platform.platform.name) || [],
			genres: videogame.genres?.map(genre => genre.name) || [],
			source: "Api"
		}
	});
}

const getFromApi= async (name)=>{
	try {
		let results
		if(name){
			//los primeros 15 de un nombre especifico
			console.log('nombre existe');
			const response = await axios.get(URL_API + `/games?key=${API_KEY}&search=${name}&page_size=15`)
			results=response.data.results
		}
		else{
			console.log('name no existe');
			const promises = [
				axios.get(URL_API + `/games?key=${API_KEY}&page=1&page_size=40`),//+40
				axios.get(URL_API + `/games?key=${API_KEY}&page=2&page_size=40`),//+40
				axios.get(URL_API + `/games?key=${API_KEY}&page=3&page_size=20`)//+20 --> Total de 100
			];
			const responses = await Promise.all(promises);

			results = responses.reduce((acc, response) => {
				return acc.concat(response.data.results);
			}, []);

		}		
		const games = mapper(results);
		return games 
	} catch (error) {
		console.error(error);
		return []	
	}

}

const getGamesFromDB = async (name) => {
	// Busca los videojuegos en la base de datos y los incluye con los géneros a los que pertenecen
	try {
		const options = {
			include: {
				model: Genre,
				attributes: ["name"],
				through: { attributes: [] }
			}
		};
		//si es por nombre que busque por nombre
		if (name) {
			options.where = { name: { [Op.iLike]: `%${name}%` } };
		}
		const gamesInDb = await Videogame.findAll(options);
		
		// Formatea los objetos de los videojuegos de la base de datos para incluir los géneros y la fuente de origen
		const games = gamesInDb.map(({ dataValues }) => {
			return {
				...dataValues,
				genres: dataValues.genres?.map(genre => genre.name),
				source: "Created"
			}
		});

		return games
	} catch(error) {
		console.error(error)
		return []
	}

}

async function getAllVideogames(req, res) {
	try {

		let gamesFromApi, gamesFromDB
		let allGames
		const name = req.query?.name
		if (name !=undefined){
			gamesFromApi = await getFromApi(name);
			gamesFromDB = await getGamesFromDB(name);
			allGames = gamesFromDB.concat(gamesFromApi.slice())

			if (allGames.length > 15) {
				allGames = allGames.slice(0, 15);
			}
		}
		else{
			gamesFromApi = await getFromApi();
			gamesFromDB = await getGamesFromDB();

			allGames = [...gamesFromDB, ...gamesFromApi,];

		}
		// Retorna los videojuegos como respuesta HTTP
		res.json(allGames);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Ocurrió un error al obtener los videojuegos.' });
	}
}


async function getVideoGameById(req, res) {
	// Obtener el ID del parámetro de la solicitud
	const { id } = req.params;
	// Declarar la variable game para almacenar el videojuego
	try {
		// Si el ID es un UUID v4 válido
		if(isUuidV4(id)){
			// Buscar el videojuego en la base de datos
			const result = await Videogame.findByPk(id,{
				include: {
				model: Genre,
        attributes: ["name", "id"],
				through: { attributes: [] }
				},
			});
			// Si no se encontró el videojuego, devolver un mensaje de error 404
			if(!result) return res.status(404).json({statusCode: 404, message: "No existe el videojuego en la DB"});
			// Si se encontró el videojuego, obtener sus datos y agregar los nombres de los géneros al objeto game
			const data = result.dataValues;
			const game = { ...data, genres: data.genres.map(genre => genre.name) }
			return res.json(game);
		}
		console.log('llegamos aquí');
		// Si el ID no es un UUID v4 válido, buscar el videojuego en el API externo
		const response = await axios.get(URL_API + `/games/${id}?key=${API_KEY}`);
		//transformo el juego en un array para poder pasarlo por mapper
		const data = [response.data]
		//y extraigo el primer y unico elemento del array
		const game=mapper(data)[0]
		return res.json(game);

	} catch (error) {
		// Si no se encontró el videojuego en la base de datos ni en el API, devolver un mensaje de error 404
		return res.status(404).json({statusCode: 404, message: "No existe el videojuevo ni en la DB ni en el API"});
	}
	
}

async function createVideoGame(req, res) {
  // Obtener los parámetros enviados en el cuerpo de la solicitud
  const { name, description, image, released, rating, platforms, genres } = req.body;
  
	try {
  	// Verificar que el parámetro 'genres' sea un array y tenga al menos un elemento
  	// y verificar que los id's enviados correspondan a las 19 categorias de los generos del api externa
		if (!genres || !Array.isArray(genres) || genres.length === 0) {
			return res.status(400).json({ statusCode: 400, error: "Debe enviar mínimo un género (su id)" });
		}

		//genres es un array de strings		
		const genrePromises = genres.map(name => Genre.findOne({ where: { name } }));
		const genresArray = await Promise.all(genrePromises);
		//si hay generos invalidos manda error
		if (genresArray.some(result => !result)) return res.status(400).json({ statusCode: 400, error: "Error con los generos, algunas no exiten en la DB" })

    // Crear un nuevo registro de videojuego con los parámetros enviados
    const newGame = await Videogame.create({
      name,
      description,
      image, 
      released,
      rating,
      platforms,
    });
		//asociar sus generos al juego
		await newGame.addGenres(genresArray);

		// Si todo funciona correctamente, se devuelve un mensaje de éxito con el código de estado 200 y el ID del videojuego creado.
		res.json(`Videojuego creado con éxito! => Id ${newGame.id}`);

  } catch (error) {
    // Si ocurre un error al crear el videojuego, se maneja y se devuelve un mensaje de error
		console.error(error)
		return res.status(400).json({message:"No se pudo crear"})
  }

}

module.exports = {
	getVideoGameById,
	getAllVideogames,
	createVideoGame,
	
};
