require('dotenv').config();
const { Sequelize } = require('sequelize');
const videogameEntity = require("./models/Videogame");
const genreEntity = require("./models/Genre");

const {
	DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: +DB_PORT,
	dialect: 'postgres',
	logging: false,
})

// Import models
const Videogame = sequelize.define('videogame', videogameEntity, {timestamps: false});
const Genre = sequelize.define('genre', genreEntity, {timestamps: false})
// Relationships
Videogame.belongsToMany(Genre, { through: "videogames_genre", timestamps: false });
Genre.belongsToMany(Videogame, { through: "videogames_genre", timestamps: false });


module.exports = {
	Videogame,
	Genre,
	conn: sequelize,
};
