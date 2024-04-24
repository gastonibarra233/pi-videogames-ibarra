require('dotenv').config();
const { URL_API, API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');


//Ruta GET, consultar detalle de videojuego DB o API

//consulta detalle del videojuego por ID

router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    //se verifica si es un juego creado, trayendo info desde la DB
    if (idVideogame.includes('-')) {
    try {
            let videogameDB = await Videogame.findOne({
                where: {
                    id: idVideogame,
                },
                include: Genre
            })
            //parseamos el objeto
            videogameDB = JSON.parse(JSON.stringify(videogameDB));
    
            //formateamos a un array con los nombres de género solamente
            videogameDB.genres = videogameDB.genres.map(g => g.name);
            return res.status(200).json(videogameDB)        
    } catch (error) {
        return res.status(404).json({ error: error.message})
    }
    } else {
        //si no es un juego creado, se busca en la API
        try {
            const response = await axios.get(`${URL_API}/${idVideogame}?key=${API_KEY}`);
            let { id, name, background_image: image, genres, description, released: releaseDate, rating, platforms } = response.data;

            //desde la API trae un array de objetos, mapeamos solo el nombre del género
            genres = genres.map(g => g.name);

            //desde la API trae un array de objetos, mapeamos solo el nombre de la plataforma
            platforms = platforms.map(p => p.platform.name);
            return res.status(200).json({
                id,
                name,
                image,
                genres,
                description,
                releaseDate,
                rating,
                platforms
            });
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
})


//Ruta POST, crear videojuego

router.post('/', async (req, res) => {
    let { name, description, releaseDate, rating, genres, platforms, image } = req.body;
    platforms = platforms.join(', ')
    try {
        const addGame = await Videogame.findOrCreate({
            where: {
                name,
                description,
                releaseDate,
                rating,
                platforms,
                image
            }
        })
        await addGame[0].setGenres(genres);
        
    } catch (error) {
        
    }
})

// module.exports = router;