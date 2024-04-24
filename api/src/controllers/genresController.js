const axios = require('axios')
const { Genre } = require('../db')
require('dotenv').config()
const { URL_API_GENRE, API_KEY } = process.env

//add genres from API to DB
const getAllGenres = async () => {
    //if I have all games in my DB, I use them from there.
    const genresDb = await Genre.findAll();
    if (genresDb.length)
        return genresDb

    const { data } = await axios(`${URL_API_GENRE}?key=${API_KEY}`)
    const allGenres = data.results

    const createdGenres = await Promise.all(allGenres.map(async g => {
        return await Genre.findOrCreate({
            where: {
                name: g.name
            }
        })
    }))

    //format genres
    return createdGenres.map(([genre]) => ({
        id: genre.id,
        name: genre.name
    }))
}

module.exports = getAllGenres;