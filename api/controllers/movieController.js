"use strict";
var mongoose = require("mongoose"),
  Movies = mongoose.model("Movies");

// exports.showAllMovies = function(req, res) {
//   Movies.find({}, function(err, movie) {
//     if (err)
//       res.send(err);
//     res.json(movie);
//   });
// };

exports.showAllMovies = function(req, res) {
  //console.log(req.query);
  Movies.find(req.query)
    .then(function(movie) {
      res.status(200).json({
        status: "success",
        data: movie,
        message: "Retrieved All Movies"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

// exports.findMovieByTitle = function(req, res) {
//   Movies.find(req.query.title)
//   .then(function(movie) {
//     res.status(200)
//     .json({
//       status: 'success',
//       data: movie,
//       message: 'Found Movie'
//     });
//   })
//   .catch(function(err) {
//     res.send(err);
//   })
// }

// exports.addMovie = function(req, res) {
//   var newMovie = new Movies(req.body);
//   newMovie.save(function(err, movie) {
//     if (err)
//       res.send(err);
//     res.json(movie);
//   });
// };

exports.addMovie = function(req, res) {
  var newMovie = new Movies(req.body);
  newMovie
    .save()
    .then(function(movie) {
      res.status(201).json({
        status: "success",
        data: movie,
        message: "Added new Movie"
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

// exports.showMovie = function(req, res) {
//   Movies.findById(req.params.movieId, function(err, movie) {
//     if (err)
//       res.send(err);
//     res.json(movie);
//   });
// };

exports.showMovie = function(req, res) {
  Movies.findById(req.params.movieId)
    .then(function(movie) {
      res.status(200).json({
        status: "success",
        movie: movie,
        message: "Retrieved movie"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

// exports.updateMovie = function(req, res) {
//   Movies.findOneAndUpdate({
//     _id: req.params.movieId
//   }, req.body, {
//     new: true
//   }, function(err, movie) {
//     if (err)
//       res.send(err);
//     res.json(movie);
//   });
// };

exports.updateMovie = function(req, res) {
  Movies.findOneAndUpdate(
    {
      _id: req.params.movieId
    },
    req.body,
    {
      new: true
    }
  )
    .then(function(movie) {
      res.status(200).json({
        status: "success",
        movie: movie,
        message: "Updated movie"
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

// exports.deleteMovie = function(req, res) {
//   Movies.remove({
//     _id: req.params.movieId
//   }, function(err, movie) {
//     if (err)
//       res.send(err);
//     res.json({
//       message: 'Movie successfully deleted'
//     });
//   });
// };

exports.deleteMovie = function(req, res) {
  Movies.remove({
    _id: req.params.movieId
  })
    .then(function(movie) {
      res.status(200).json({
        status: "success",
        message: "Movie delted successfully"
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};
