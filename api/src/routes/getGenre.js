require('dotenv').config();
const { URL_API_GENRE, API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Genre } = require('../db');

router.get('/', async (req, res) => {
    try {
        //si ya tengo cargado los datos de los VG en la DB los consumo desde allí
        const genresDB = await Genre.findAll();
        if (genresDB.length)
            return res.status(200).json(genresDB)
        
        //o los busco desde la API
        const response = await axios.get(`${URL_API_GENRE}?key=${API_KEY}`);
        //recibo array de objetos con los juegos filtrados por GENRE
        const genres = response.data.results;
        //guardo en la DB filtrando solo por 'name'
        genres.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g.name
                }
            })
        })
        const genresReady = genres.map(game => {
            return {
                id: game.id,
                name: game.name
            }
        });
        return res.status(200).json(genresReady)
    } catch (error) {
        return res.status(404).json({ error: error.message})
    }
})

module.exports = router;