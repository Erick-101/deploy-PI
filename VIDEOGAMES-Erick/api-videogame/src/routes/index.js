const { Router } = require("express");
const { getAllGenres } = require("../controllers/genre.controller");
const { getAllVideogames, getVideoGameById, createVideoGame } = require("../controllers/videogame.controller");

const routerApp = Router();

routerApp.get("/genres", getAllGenres);

routerApp.get("/videogames", getAllVideogames);
routerApp.get("/videogames/:name", getAllVideogames);
routerApp.get("/videogame/:id", getVideoGameById);
routerApp.post("/videogame", createVideoGame);

module.exports = routerApp;