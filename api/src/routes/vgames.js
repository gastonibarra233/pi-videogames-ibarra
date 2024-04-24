const { Router } = require('express')
const routerVgames = Router()

//handlers
const {
    getVgamesHandler,
    getVgameByIdHandler,
    getPlatformsHandler,
    createHandler
} = require('../handlers/vgameHandler')

routerVgames.get('/', getVgamesHandler)
routerVgames.get('/platforms', getPlatformsHandler)
routerVgames.get('/:idVideogame', getVgameByIdHandler)
routerVgames.post('/new', createHandler)

module.exports = routerVgames