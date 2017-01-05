var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

// Set up bodyParser and set a sane upper size limit

app.use(bodyParser.json({limit: '5mb'}));

// Allow validating input

app.use(expressValidator());

// Allow cross-origin

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
  next();
});

// Protect against mongo query attacks

app.use(function(req, res, next) {
  next();
});

// Initialize the app.

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});

// Default route so we don't get an error

app.get('/', function(req, res) {
  res.end('');
});

// Import modules

app.use('/games', require('./games'));
