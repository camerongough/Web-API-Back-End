'use strict';
module.exports = function(app) {
  var movies = require('../controllers/movieController');

  // movie Routes
  app.route('/movies')
    .get(movies.list_all_movies)
    .post(movies.add_a_movie);


  app.route('/movies/:movieId')
    .get(movies.read_a_movie)
    .put(movies.update_a_movie)
    .delete(movies.delete_a_movie);
};
