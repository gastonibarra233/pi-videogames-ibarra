const { Router } = require("express");
const router = Router();
require("dotenv").config();
const { URL_API_PLATFORMS, API_KEY } = process.env;
const axios = require("axios").default;
const { Videogame } = require("../db");

router.get("/", async (req, res) => {
  try {
    const platformsDB = await Videogame.findAll();
    if (platformsDB.length) return res.status(200).json(platformsDB);

    const response = await axios.get(`${URL_API_PLATFORMS}?key=${API_KEY}`);

    const platforms = response.data.results;

    platforms.forEach(async (p) => {
      await Videogame.findOrCreate({
        where: {
          name: p.name,
        },
      });
    });
    const platformsReady = platforms.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
    return res.status(200).json(platformsReady);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

// module.exports = router;
