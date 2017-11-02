'use strict';
module.exports = function(app) {
  var movies = require('../controllers/movieController');
  var userHandler = require('../controllers/userController.js');

  // movie Routes
  app.route('/api/v1/movies')
    .post(userHandler.loginUserRequired,movies.add_a_movie)
    .get(movies.list_all_movies);

  app.route('/api/v1/movies/:movieId')
    .get(movies.read_a_movie)
    .put(movies.update_a_movie)
    .delete(movies.delete_a_movie);
};
