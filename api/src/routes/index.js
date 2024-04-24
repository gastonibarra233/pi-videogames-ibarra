const { Router } = require("express");
const router = Router();

const routerVgames = require('./vgames')
const routerGenres = require('./genres')

router.use('/videogames', routerVgames)
router.use('/genres', routerGenres)

module.exports = router;
