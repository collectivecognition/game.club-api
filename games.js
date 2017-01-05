require('es6-promise').polyfill();
require('isomorphic-fetch');
var unirest = require('unirest');

var express = require('express');

// Configure router

var router = express.Router();

// Search for a game

// GET /games?q=:term

router.get('/', function(req, res) {
  unirest.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games?search=${req.query.q}`)
    .header('X-Mashape-Key', process.env.MASHAPE_KEY)
    .header('Accept', 'application/json')
    .end(function(result) {
      if(result.status >= 400){
        console.log(process.env.MASHAPE_KEY, result.body);
        return res.status(404).json({message:'Error'}); // FIXME
      }

      res.json(result.body);
    });
});

module.exports = router;
