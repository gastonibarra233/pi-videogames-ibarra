const { Router } = require('express')
const routerGenres = Router()

//handlers
const genresHandler = require('../handlers/genresHandlers')

routerGenres.get('/', genresHandler)

module.exports = routerGenres;
