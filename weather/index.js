const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

async function getWeather(searchtext) {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.WEATHER_API_KEY}&q=${searchtext}`;
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
}

router.get("/", (req, res) => {
  res.json({ success: "Hello, weather!" });
});

router.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await getWeather(searchtext);
    res.json(data);
})

router.post("/", async (req, res) => {
    const searchtext = req.body.searchtext;
    const data = await getWeather(searchtext);
    res.json(data);
})

module.exports = router;
