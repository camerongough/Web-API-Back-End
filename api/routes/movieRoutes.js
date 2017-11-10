'use strict';
module.exports = function(app) {
  var movies = require('../controllers/movieController');

  // movie Routes
  app.route('/api/v1/movies')
    .post(movies.addMovie)
    .get(movies.showAllMovies);

  app.route('/api/v1/movies/:movieId')
    .get(movies.showMovie)
    .put(movies.updateMovie)
    .delete(movies.deleteMovie);
};
