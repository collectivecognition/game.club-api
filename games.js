require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');

// Configure router

var router = express.Router();

// Search for a game

// GET /games?q=:term

router.get('/', function(req, res) {
  fetch(`http://thegamesdb.net/api/GetGamesList.php?name=${req.query.q}`)
    .then(function(response) {
      if(response.status >= 400){
        return res.status(404).json({}); // FIXME

        console.log(response);
      }
    });
});

module.exports = router;
