const { Genre } = require('../db');
// GET all genres

const axios = require("axios");
const {URL_API, API_KEY} = process.env;

// 1. Función para obtener todos los géneros de la base de datos
async function getAllGenres(req, res) {
	try {
		const genresDB = await Genre.findAll();
		return res.json(genresDB);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error retrieving genres from database" });
	}
}

// 2. Función para poblar la base de datos con los géneros desde la API externa
// Se ejecutara al iniciar el servidor

async function populateGenresOnDB() {
	try {
		// 1. Se realiza una petición a la API externa para obtener los géneros
		const response = await axios.get(URL_API + `/genres?key=${API_KEY}`);

		// 2. Obtenemos los nombres de los géneros desde la respuesta de la API y los convertimos en objetos con el formato requerido por la base de datos
		const genres = response.data.results.map(genre => ({ name: genre.name }));

		// 3. Insertamos los géneros en la base de datos utilizando el método bulkCreate de Sequelize. 
		// Si un género ya existe en la base de datos, no se inserta.
		await Genre.bulkCreate(genres, { ignoreDuplicates: true });

		// 4. Imprimimos un mensaje en la consola para indicar que la operación ha terminado
		console.log("Géneros repoblados en la base de datos.");
	} catch (error) {
		console.error(error);
	}

}



module.exports = {getAllGenres, populateGenresOnDB };
