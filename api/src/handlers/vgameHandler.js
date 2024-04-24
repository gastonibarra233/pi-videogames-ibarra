const {
  getAllGames,
  getAllPlatforms,
  searchVgameByName,
  getVgameById,
  addGame,
} = require("../controllers/vgameController");

//get all games
const getVgamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await searchVgameByName(name) : await getAllGames();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getPlatformsHandler = async (req, res) => {
  try {
    const getPlatforms = await getAllPlatforms()
    return res.status(200).json(getPlatforms)
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

//get videogame detail
const getVgameByIdHandler = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const getById = await getVgameById(idVideogame);
    return res.status(200).json(getById);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//create a new game
const createHandler = async (req, res) => {
    const { name, description, releaseDate, rating, genres, platforms, image } = req.body
  try {
        const videogame = await addGame(name, description, releaseDate, rating, genres, platforms, image)
        res.status(200).json(videogame);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
  getVgamesHandler,
  getPlatformsHandler,
  getVgameByIdHandler,
  createHandler,
};
