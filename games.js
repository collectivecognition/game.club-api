const unirest = require('unirest')
const express = require('express')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose').set('debug', true)

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
  unirest.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,screenshots&limit=10&offset=0&order=release_dates.date%3Adesc&search=${req.query.q}`)
  .header('X-Mashape-Key', process.env.MASHAPE_KEY)
  .header('Accept', 'application/json')
  .end(result => {
    res.status(result.status).json(result.body)
  })
})

// Get the info for a game

// GET /games/:id

router.get('/:id', (req, res) => {
  Game.findOne({igdbId: req.params.id})
    .exec(function(err, game) {
      console.log('err', err)
      console.log('game', game
      // Game not found in db, retrieve it from igdb

      if(err){
        return unirest.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/${req.params.id}?fields=name,screenshots`)
          .header('X-Mashape-Key', process.env.MASHAPE_KEY)
          .header('Accept', 'application/json')
          .end(result => {
            
            // Game found in igdb, insert it into db and return it

              const game = new Game({
                name: result.name,
                igdbId: result.id,
                imageUrl: 'TODO'
              })

              game.save((err, game) => {
                if(err){
                  return res.status(500).json({message: 'Problem inserting game in database.', error: err.message})
                }

                res.json(game);
              });
          })
          .catch(err => {

            // Game not found in igdb either, throw an error

            res.status(404).json({message: 'Game not found.', error: err.message})
          })
      }

      // Game found in db, return it

      res.json(game)
    })
})

module.exports = router