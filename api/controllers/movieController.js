'use strict';
var mongoose = require('mongoose'),
  Movies = mongoose.model('Movies');

exports.showAllMovies = function(req, res) {
  Movies.find({}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.addMovie = function(req, res) {
  var new_movie = new Movies(req.body);
  new_movie.save(function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.showMovie = function(req, res) {
  Movies.findById(req.params.movieId, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.updateMovie = function(req, res) {
  Movies.findOneAndUpdate({
    _id: req.params.movie_id
  }, req.body, {
    new: true
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.deleteMovie = function(req, res) {
  Movies.remove({
    _id: req.params.movie_id
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({
      message: 'Movie successfully deleted'
    });
  });
};
