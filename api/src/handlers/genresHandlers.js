const getAllGenres = require('../controllers/genresController')

//get all genres
const genresHandler = async (req, res) => {
    try {
        const allGenres = await getAllGenres();
        res.status(200).json(allGenres)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = genresHandler;