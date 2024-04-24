const axios = require("axios");
require("dotenv").config();
const { URL_API, URL_API_PLATFORMS, API_KEY } = process.env;


const { Videogame, Genre } = require('../db')

//get all games from API
const getVgamesApi = async () => {
    //videogames list
    let gamesReady = []
    let nextPage = `${URL_API}?key=${API_KEY}`;
    let pageCount = 0

    while (nextPage && pageCount < 6) {
        const { data } = await axios(nextPage)
        
    gamesReady.push(data.results
    .filter(g =>  g.rating > 0)
    .map(g => ({
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            rating: g.rating,
            genres: g.genres.map(gen => gen.name),          
    }))
)
    nextPage = data.next
    pageCount++;
    }
    return gamesReady;
}

//get videogames from DB
const getVgamesDb = async () => {
    //DataBase list
    const vgamesDB = await Videogame.findAll({
      include: Genre,
    });

    //mapping results and format them
    const vgamesDbFormat = vgamesDB.map(g => {
        return {
          id: g.id,
          name: g.name,
            image: g.image,
          rating: g.rating,
          genres: (g.Genre.map(gen => gen.name)).join(', ')
        };
    })
    return vgamesDbFormat;
}


//join api and DB videogames
const getAllGames = async () => {
    const [vgamesApi, vgamesDb] = await Promise.all([getVgamesApi(), getVgamesDb()])
    return [...vgamesApi, ...vgamesDb]
}

const getAllPlatforms = async () => {
  const { data } = await axios.get(`${URL_API_PLATFORMS}?key=${API_KEY}`)

  const allPlatforms = data.results.map(p => {
    return {
      name: p.name
    }
  })
  return allPlatforms
}

//Search by name
const searchVgameByName = async (name) => {
    const [vgamesApi, vgamesDb] = await Promise.all([
      getVgamesApi(),
      getVgamesDb(),
    ]);

    //filter videogames by name
    const filteredGames = [];
    [...vgamesApi, ...vgamesDb].forEach(innerArray => {
        const filteredInnerArray = innerArray.filter(g => g.name && g.name.trim().toLowerCase().includes(name.trim().toLowerCase())
        );
        filteredGames.push(...filteredInnerArray)
    });
    
    const first15Games = filteredGames.slice(0, 15)
    return first15Games
}


//get a videogame detail
const getVgameById = async (idVideogame) => {

  if (!idVideogame) {
    throw new Error("Put an ID!")
  }
    //if the videogame is not from API
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        });
        if (!videogameDb) {
            throw new Error(`The videogame doesn't exist in the DataBase, with ID: ${id}`)
        }
        //parse
        videogameDb = JSON.parse(JSON.stringify(videogameDb));
        //format genres
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        return videogameDb
    } else {
        //if it's not a created game, search in API
        const response = await axios.get(`${URL_API}/${idVideogame}?key=${API_KEY}`)
        const {
            id,
            name,
            background_image: image,
            genres,
            description,
            released: releaseDate,
            rating,
            platforms
        } = response.data;
        //we need only api genre name
        const formattedGenres = genres.map(g => g.name)

      const formattedPlatforms = platforms.map(p => p.platform.name)
      
        return {
            id,
            name,
            image,
            genres: formattedGenres,
            description,
            releaseDate,
            rating,
            platforms: formattedPlatforms
        }
    }
}


//Create a new videogame
const addGame = async (
  name,
  description,
  releaseDate,
  rating,
  genres,
  platforms,
  image
) => {
  if (
    !name ||
    !description ||
    !releaseDate ||
    !rating ||
    !genres ||
    !platforms ||
    !image
  ) {
    throw new Error('All fields are required')
  }

  if (genres.length === 0) {
    throw new Error("You must add at least 1 genre.");
  }
   const platformsString = Array.isArray(platforms) ? platforms.join(", ") : platforms;

  const [videogame, created] = await Videogame.findOrCreate({
    where: {
      name,
      description,
      releaseDate,
      rating,
      platforms: platformsString,
      image,
    },
  });

  if (!created) {
    throw new Error("This videogame is already exists!")
  }
  
  const genreInstances = await Promise.all(genres.map(genreName => Genre.findOrCreate({
    where: { name: genreName }
  })))

  await videogame.setGenres(genreInstances.map(([genre]) => genre))
  return videogame;    

};

module.exports = {
  getAllGames,
  getAllPlatforms,
    searchVgameByName,
    getVgameById,
    addGame
}