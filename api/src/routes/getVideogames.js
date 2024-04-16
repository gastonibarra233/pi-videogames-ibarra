const { Router } = require("express");
const router = Router();
require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");

//Ruta GET para hacer llamado de todos los videojuegos

router.get("/", async (req, res) => {
  let videogamesDB = await Videogame.findAll({
    include: Genre,
  });
  //parseamos el objeto
  videogamesDB = JSON.stringify(videogamesDB);
  videogamesDB = JSON.parse(videogamesDB);

  //array de objetos con los nombres de cada género
  videogamesDB = videogamesDB.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );

  //Ruta GET para llamar 'name' por query
  if (req.query.name) {
    try {
      //si existe el juego en la API
      let response = await axios.get(
        `${URL_API}?search=${req.query.name}&key=${API_KEY}`
      );
      if (!response.data.count)
        return res.status(404).json(`Juego no encontrado "${req.query.name}"`);
      //filtro solo la data que necesito para enviar al FRONT
      const gamesReady = response.data.results
        .filter((game) => game.rating > 0)
        .map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map((g) => g.name),
          };
        });

      //anteriormente se trajeron todos los juegos de la DB, si entro por queries solo filtro los que coincidan con la búsqueda
      const filteredGamesDB = videogamesDB.filter((g) =>
        g.name.toLowerCase().includes(req.query.name.toLowerCase())
      );
      //damos prioridad a la DB, y sumamos todos. Cortamos array en 15.
      const results = [...filteredGamesDB, ...gamesReady.splice(0, 15)];
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  } else {
    //si no ingresamos por query, se buscan los videojuegos de la API
    try {
      let pages = 0;
      let results = [...videogamesDB]; //sumamos lo que tenemos en la DB
      let response = await axios.get(`${URL_API}?key=${API_KEY}`);
      while (pages < 6) {
        pages++;
        //filtramos solo la data que necesito enviar al FRONT
        const gamesReady = response.data.results
          .filter((game) => game.rating > 0)
          .map((game) => {
            return {
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              rating: game.rating,
              genres: game.genres.map((g) => g.name),
            };
          });
        results = [...results, ...gamesReady];
        //volvemos a llamar a la API con next
        response = await axios.get(response.data.next);
      }
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
});

module.exports = router;
