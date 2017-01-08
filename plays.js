const express = require('express')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose').set('debug', true)

const PlaySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 5
  },
  status: {
    type: mongoose.Schema.Types.String,
    enum: ['TO_PLAY', 'PLAYED', 'STOPPED_PLAYING'],
    default: 'TO_PLAY'
  }
})
const Play = mongoose.model('Play', PlaySchema)

// Configure router

const router = express.Router()

module.exports = router