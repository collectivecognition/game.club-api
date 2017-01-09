const unirest = require('unirest')
const express = require('express')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose').set('debug', true)

const constants = require('./constants')

const GameSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
  igdbId: Number
})
const Game = mongoose.model('Game', GameSchema)

// Configure router

const router = express.Router()

// Search for a game

// GET /games?q=:term

router.get('/', (req, res) => {
  unirest.get(`${constants.API_PATH}/search?format=json&field_list=name,id,image&limit=10&resources=game&api_key=${process.env.GIANT_BOMB_API_KEY}&query=${req.query.q}`)
  .header('User-Agent', constants.API_USER_AGENT)
  .header('Accept', 'application/json')
  .end(result => {
    res.status(result.status).json(result.body.results)
  })
})

// Get the info for a game

// GET /games/:id

router.get('/:id', (req, res) => {
  Game.findOne({giantBombId: req.params.id}, (err, game) => {

    if(err){
      return res.status(500).json({message: 'Problem finding game.', error: err.message})
    }

    // Game not found in db, retrieve it from igdb

    if(game == null){
      return unirest.get(`${constants.API_PATH}/game/${req.params.id}?format=json&field_list=name,id,image&resources=game&api_key=${process.env.GIANT_BOMB_API_KEY}&query=${req.query.q}`)
        .header('X-Mashape-Key', process.env.MASHAPE_KEY)
        .header('Accept', 'application/json')
        .end(result => {

          // Game not found in igdb either, throw an error

          if(result.error !== 'OK'){
            return res.status(404).json({message: 'Game not found.'})
          }
          
          // Game found in igdb, insert it into db and return it

          const game = new Game({
            name: result.body.name,
            giantBombId: result.body.id,
            images: req.body.image
          })

          game.save((err, game) => {
            if(err){
              return res.status(500).json({message: 'Problem inserting game in database.', error: err.message})
            }

            res.json(game);
          });
        })
    }

    // Game found in db, return it

    res.json(game)
  })
})

module.exports = router