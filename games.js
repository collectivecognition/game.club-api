var unirest = require('unirest');
var express = require('express');

// Configure router

var router = express.Router();

// Search for a game

// GET /games?q=:term

router.get('/', function(req, res) {
  unirest.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?field=name,screenshots&limit=10&offset=0&order=release_dates.date%3Adesc&search=${req.query.q}`)
  .header('X-Mashape-Key', process.env.MASHAPE_KEY)
  .header('Accept', 'application/json')
  .end(function (result) {
    res.status(result.status).json(result.body);
  });
});

module.exports = router;
