'use strict';
module.exports = function(app) {
	var movies = require('../controllers/movieController'),
		auth = require('../controllers/authController');

	/** movie Routes */
	app
		.route('/api/v1/movies')
		.post(movies.addMovie)
		.get(movies.showAllMovies);

	app
		.route('/api/v1/movies/search')
		.get(movies.searchMovieTitle);

	app
		.route('/api/v1/movies/find_id')
		.get(movies.findMovieFromMovieDB);

	app
		.route('/api/v1/movies/get_details')
		.get(movies.getMovieDetailsFromMovieDB);

	app
		.route('/api/v1/movies/:movieId')
		.get(movies.showMovie)
		.put(auth.isAdmin, movies.updateMovie)
		.delete(auth.isAdmin, movies.deleteMovie);
};
