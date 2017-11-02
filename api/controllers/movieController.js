'use strict';
var mongoose = require('mongoose'),
  Movies = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  Movies.find({}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.add_a_movie = function(req, res) {
  var new_movie = new Movies(req.body);
  new_movie.save(function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.read_a_movie = function(req, res) {
  Movies.findById(req.params.movieId, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.update_a_movie = function(req, res) {
  Movies.findOneAndUpdate({
    _id: req.params.movieId
  }, req.body, {
    new: true
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.delete_a_movie = function(req, res) {
  Movies.remove({
    _id: req.params.movieId
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({
      message: 'Movies successfully deleted'
    });
  });
};
