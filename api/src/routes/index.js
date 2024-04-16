require("dotenv").config();
const { Router } = require("express");
const router = Router();

const videogames = require('./getVideogames');
const videogame = require('./getPostVgame');
const genres = require('./getGenre');
// const deleteDb = require('./deleteVgame')

router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);

module.exports = router;
