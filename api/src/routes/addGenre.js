const { Genre } = require('../db')
const axios = require('axios')
require('dotenv').config()
const { URL_API_GENRE, API_KEY } = process.env
const { Router } = require('express')
const router = Router()

router.post('/', async (req, res) => {
    const { id, genres } = req.body;
    genres = genres.join(', ')
    try {
        const addGenre = await Genre.findeOrCreate({
            where: {
                id,
                genres,
            }
        })

        return res.status(200).json(addGenre)
        
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
    
})

module.exports = router;