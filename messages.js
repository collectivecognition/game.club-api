const express = require('express')
const paginate = require('express-paginate')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose').set('debug', true)
const mongoosePaginate = require('mongoose-paginate')

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  timestamp: mongoose.Schema.Types.Date,
  text: mongoose.Schema.Types.Text
})
MessageSchema.plugin(mongoosePaginate)
const Message = mongoose.model('Message', MessageSchema)

// Configure router

const router = express.Router()

module.exports = router