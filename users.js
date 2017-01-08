const express = require('express')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose').set('debug', true)

const UserSchema = mongoose.Schema({
  name: String,
  googleId: String,
  profileImageUrl: String
})
const User = mongoose.model('User', UserSchema)

// Configure router

const router = express.Router()

module.exports = router