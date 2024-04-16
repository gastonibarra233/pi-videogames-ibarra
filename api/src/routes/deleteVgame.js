require('dotenv').config();
const { URL_API, API_KEY } = process.env;
const { Router } = require('express')
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db')

// Delete from DB

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Videogame.destroy({
            where: {
                 id,
            },
            force: true,
        })
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
})    
