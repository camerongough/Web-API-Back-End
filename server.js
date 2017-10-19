var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Movie = require('./api/models/movieModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cinema', {
  useMongoClient: true,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/movieRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('cinema RESTful API server started on: ' + port);
