import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVideogame, getGenres } from "../../actions/index";
import "./Create.css";

export default function Create() {
	const dispatch = useDispatch();
	const genres = useSelector((store) => store.genres);
	const genres1 = genres.slice(0, 10)
	const genres2 = genres.slice(10, 20)

	const [game, setGame] = useState({
		name: "",
		description: "",
		image: "",
		released: "",
		rating: 0,
		genres: [],
		platforms: [],
	});

	useEffect(() => {
		dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const randomPlatforms = ["PlayStation 4", "PlayStation 5", "Android", "macOS", "PS Vita", "PC", "iOS", "Xbox", ]

	const ChangeInput = (e) => {
		if (e.target.name === "genres" || e.target.name === "platforms") {
			const arr = game[e.target.name];
			setGame({
				...game,
				[e.target.name]: arr.concat(e.target.value),
			});
		} else {
			setGame({
				...game,
				[e.target.name]: e.target.value,
			});
		}
	};



	const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: game.name,
			description: game.description,
			image: game.image,
			released: game.released,
			rating: game.rating,
			genres: game.genres,
			platforms: game.platforms,
		};

		// Validaciones
		if (!obj.name) {
			alert("¡Oye! No olvides el nombre.")
			return
		}
		if (!obj.description) {
			alert("¡Oye! No olvides la descripción.")
			return
		} if (!obj.released) {
			alert("¡Oye! No olvides la fecha.")
			return
		} if (obj.rating > 5 || obj.rating < 0) {
			alert("¡Oye! La calificación debe estar entre 0 y 5.")
			return
		}
		if (obj.genres.length === 0 || obj.platforms.length=== 0) {
			alert("Necesitas almenos un geneor y plataforma")
			return
		}


		dispatch(createVideogame(obj));
		e.target.reset();
		alert("Videjuego creado exitosamente");
		/* dispatch(getVideogames()) */

		setGame({
			name: "",
			description: "",
			image: "",
			released: "",
			rating: 0,
			genres: [],
			platforms: [],
		});
	};

	return (
		<div className="container">
			<h1>Registra un videojuego</h1>
			<form
				id="survey-form"
				className="form"
				noValidate
				onChange={(e) => ChangeInput(e)}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div>
					<div>
						<div className="divTitles">
							<div className="imagediv">
								<label>Nombre</label>
								<input
									className="label"
									type="text"
									name="name"
									value={game.name}
								></input>
							</div>
							<div className="imagediv">
								<label>Descripción</label>
								<input
									className="label"
									type="text"
									name="description"
									value={game.description}
								></input>
							</div>
							<div className="imagediv">
								<label>Released:</label>
								<input
									className="label"
									type="date"
									name="released"
									value={game.released}
								></input>
							</div>
							<div className="imagediv">
								<label>Rating:</label>
								<input
									className="label"
									type="number"
									name="rating"
									value={game.rating}
								></input>
							</div>
							<div className="imagediv">
								<label>URL de la Imagen:</label>
								<input
									className="label"
									type="text"
									name="image"
									value={game.image}
								></input>
							</div>
						</div>
						
					</div>
					<div className="checkboxs">
						<div className="checks">
							<label>Géneros:</label>
							<div className="gendivs">
								<div>
									{genres1.map((gen) => (
										<div key={gen.name} className="c-item">
											<input
												type="checkbox"
												name="genres"
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
								<div>
									{genres2.map((gen) => (
										<div key={gen.name} className="c-item"> 
											<input
												type="checkbox"
												name="genres"
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="checks">
							<label>Plataformas:</label>
							<div className="gendivs" >
								{randomPlatforms.map((P) => (
									<div key={P} className="c-item">
										<input
											type="checkbox"
											name="platforms"
											value={P}
										></input>
										<label name={P}>{P}</label>
									</div>
								))}
							</div>
						</div>
					</div>
					<button className="button" type="submit">
						Registrar
					</button>
				</div>
			</form>
		</div>
	);
}

