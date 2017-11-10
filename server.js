var express = require('express'),
  cors = require('cors'),
  app = express(),
  appAuth = express(),
  port = process.env.PORT || 3000,
  authPort = process.env.AUTHPORT || 3300,
  mongoose = require('mongoose'),
  passport = require('passport'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  config = require('./config/config');

// mongoose connection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/cinema', {
  useMongoClient: true
});

var corsOptions = {
  origin: 'http://207.154.211.202:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// appAuth.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// appAuth.use(morgan('dev'));
// appAuth.use(bodyParser.json());
// appAuth.use(bodyParser.urlencoded({
//   extended: true
// }));

//API Models
var Movie = require('./api/models/movieModel'),
  User = require('./api/models/userModel');

//API Routes
var movieRoutes = require('./api/routes/movieRoutes');
movieRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);
var authRoutes = require('./api/routes/authRoutes');
authRoutes(app);

app.use(cors(corsOptions));
//appAuth.use(cors(corsOptions));

app.listen(port);
//appAuth.listen(authPort);

console.log('cinema RESTful API server started on: ' + port); // + ' & ' + authPort);
