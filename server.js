var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  passport = require('passport'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  config = require('./config/config');
//session = require('express-session'),
//mongoDBStore = require('connect-mongodb-session')(session);

// mongoose connection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/cinema', {
  useMongoClient: true
});

//require('./config/passport')(passport);

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(passport.initialize());

//API Models
var Movie = require('./api/models/movieModel'),
  User = require('./api/models/userModel');

  app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

//API Routes
var movieRoutes = require('./api/routes/movieRoutes');
movieRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

app.listen(port);

console.log('cinema RESTful API server started on: ' + port);
