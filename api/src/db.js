require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const videogameModelFn = require("./models/Videogame");
const genreModelFn = require("./models/Genre");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
//ejecutar modelos
videogameModelFn(sequelize);
genreModelFn(sequelize);

//relaciones
const { Videogame, Genre } = sequelize.models;
Videogame.belongsToMany(Genre, { through: "VideogameGenre" });
Genre.belongsToMany(Videogame, { through: "VideogameGenre" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
