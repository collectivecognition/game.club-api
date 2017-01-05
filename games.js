require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');

// Configure router

var router = express.Router();

// Search for a game

// GET /games?q=:term

router.get('/', function(req, res) {
  fetch(`https://igdbcom-internet-game-database-v1.p.mashape.com/games?search=${req.query.q}`, {
    method: 'get',
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY
    }  
  })
  .then(function(response) {
    if(response.status >= 400){
      console.log(process.env.MASHAPE_KEY, response);
      return res.status(404).json({message:'Error'}); // FIXME

      res.json(response);
    }
  });
});

module.exports = router;
