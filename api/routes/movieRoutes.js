'use strict';
module.exports = function(app) {
	var movies = require('../controllers/movieController'),
		auth = require('../controllers/authController');

	/** movie Routes */
	app
		.route('/api/v1/movies')
		.post(auth.isAdmin, movies.addMovie)
		.get(movies.showAllMovies);

	app.route('/api/v1/movies/find_id').get(movies.findMovieFromMovieDB);

	app
		.route('/api/v1/movies/get_details')
		.get(movies.getMovieDetailsFromMovieDB);

	app
		.route('/api/v1/movies/:movieId')
		.get(movies.showMovie)
		.put(auth.authorize, movies.updateMovie)
		.delete(auth.authorize, movies.deleteMovie);
};
