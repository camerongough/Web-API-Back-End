var express = require('express'),
  cors = require('cors'),
  etag = require('etag'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  config = require('./config/config');

// mongoose connection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/cinema', {
  useMongoClient: true
});

app.enable('etag');
app.set('etag', 'strong');

var corsOptions = {
  origin: 'http://207.154.211.202:4200',
  optionsSuccessStatus: 200
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

//API Models
var Movie = require('./api/models/movieModel'),
  User = require('./api/models/userModel'),
  MovieSchedule = require('./api/models/movieScheduleModel'),
  UserFavList = require('./api/models/userFavListModel'),
  UserWatchList = require('./api/models/userWatchListModel');

//API Routes
var movieRoutes = require('./api/routes/movieRoutes');
movieRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);
var authRoutes = require('./api/routes/authRoutes');
authRoutes(app);

app.use(cors(corsOptions));

app.listen(port);

console.log('cinema RESTful API server started on: ' + port);
