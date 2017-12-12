'use strict';
/**
 * Movie Controller
 * @module movieController
 */
var mongoose = require('mongoose'),
	Movies = mongoose.model('Movies'),
	db = require('../../config/database'),
	config = require('../../config/config'),
	rp = require('request-promise');

/**
 * Gets movie ID from MovieDB
 * @param {string} movie - Movie Name
 * @param {number} year - Year Movie was Released
 * @returns {object} movieId, title - The movie ID and Title
 * @throws {error} err
 */
exports.findMovieFromMovieDB = function(req, res) {
	var movieName = req.query.movie;
	var yearOf = req.query.year;
	var options = {
		method: 'GET',
		url: 'https://api.themoviedb.org/3/search/movie',
		qs: {
			year: yearOf,
			include_adult: 'false',
			page: '1',
			query: movieName,
			language: 'en-UK',
			api_key: 'c0cab9b0205b7428fc5b85413f00f8c3'
		},
		body: '{}'
	};
	rp(options)
		.then(function(body) {
			var jsonContent = JSON.parse(body);
			var content = jsonContent.results;

			for (var item of content) {
				var movieId = item.id;
				var title = item.title;
				break;
			}
			res.status(200).json({
				movieId: movieId,
				title: title
			});
		})
		.catch(function(err) {
			return res.send(err);
		});
};

/**
 * Gets movie details from MovieDB
 * @param {number} movieId - The Movie ID from The MovieDB
 * @returns {object} movie - The full details of the movie
 * @throws {error} err
 */
exports.getMovieDetailsFromMovieDB = function(req, res) {
	var options = {
		method: 'GET',
		url: 'https://api.themoviedb.org/3/movie/' + req.query.movieId,
		qs: {
			append_to_response: 'release_dates,credits',
			language: 'en-UK',
			api_key: 'c0cab9b0205b7428fc5b85413f00f8c3'
		},
		body: '{}'
	};
	rp(options)
		.then(function(body) {
			var detailsBody = JSON.parse(body);
			var movieId = detailsBody.id;
			var movieTitle = detailsBody.title;
			var movieReleaseDate = detailsBody.release_date;
			var movieOverview = detailsBody.overview;
			var movieRuntime = detailsBody.runtime;
			var moviePosterPath = detailsBody.poster_path;
			var movieHomepage = detailsBody.homepage;

			var certResults = detailsBody.release_dates.results;
			for (var item of certResults) {
				if (item.iso_3166_1 === 'GB') {
					var releaseDates = item.release_dates;
					for (var jtem of releaseDates) {
						var movieCertification = jtem.certification;
						break;
					}
				}
			}

			var creditResults = detailsBody.credits.cast;
			var k = 0;
			var cast = [];
			for (item of creditResults) {
				cast.push(item.name);
				k++;
				if (k === 3) {
					break;
				}
			}

			var cast1 = cast[0];
			var cast2 = cast[1];
			var cast3 = cast[2];

			var crewResults = detailsBody.credits.crew;
			for (item of crewResults) {
				if (item.job === 'Director') {
					var movieDirector = item.name;
					break;
				}
			}

			res.status(200).json({
				movie_id: movieId,
				title: movieTitle,
				release_date: movieReleaseDate,
				overview: movieOverview,
				runtime: movieRuntime,
				poster_path: moviePosterPath,
				homepage: movieHomepage,
				certification: movieCertification,
				cast: [cast1, cast2, cast3],
				director: movieDirector
			});
		})
		.catch(function(err) {
			res.send(err);
		});
};

/**
 * Shows all movies
 * @return {status} success
 * @return {object} movie - All Movie Ojects
 * @throws {error} err
 */
exports.showAllMovies = function(req, res) {
	db.connect(config.database);
	Movies.find(req.query)
		.then(function(movie) {
			res.status(200).json({
				status: 'success',
				data: movie,
				message: 'Retrieved All Movies'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
};

/**
 * Adds new movie to the database
 * @param {object} Movies - Movie Object defined in Movie Schema
 * @return {status} success
 * @return {object} movie
 * @throws {error} err
 */
exports.addMovie = function(req, res) {
	db.connect(config.database);
	var newMovie = new Movies(req.body);
	newMovie
		.save()
		.then(function(movie) {
			res.status(201).json({
				status: 'success',
				data: movie,
				message: 'Added new Movie'
			});
		})
		.catch(function(err) {
			res.status(401).send(err);
		});
};

/**
 * Returns a Movie
 * @param {string} movieId - Movie ID
 * @returns {object} movie - Movie Details
 * @throws {error} err
 */
exports.showMovie = function(req, res) {
	db.connect(config.database);
	Movies.findById(req.params.movieId)
		.then(function(movie) {
			res.status(200).json({
				status: 'success',
				movie: movie,
				message: 'Retrieved movie'
			});
		})
		.catch(function(err) {
			return res.send(err);
		});
};

/**
* Search for movie title
* @param {string} movie - Movie title
* @return {object} movie - Movie (or movies) that match title
* @return {status}
* @throws {error} err
*/
exports.searchMovieTitle = function(req, res) {
	db.connect(config.database);
	Movies.find({ $text: { $search: req.query.movie } })
		.then(function(movie) {
			if (movie.length < 1) {
				res.status(200).json({
					status: 'failed',
					message: 'Movie title not found'
				});
			} else {
				res.status(200).json({
					status: 'success',
					movie: movie,
					message: 'Searched for movie title'
				});
			}
		})
		.catch(function(err) {
			return res.send(err);
		});
};

/**
 * Updates a movies
 * @param {string} movieId - Movie ID
 * @param {object} movie - Updated Movie Object
 * @return {object} movie - Updated Movie Details
 * @return {status}
 * @throws {error} err
 */
exports.updateMovie = function(req, res) {
	db.connect(config.database);
	Movies.findOneAndUpdate(
		{ _id: req.params.movieId },
		req.body,
		{ new: true },
		function(movie, err) {
			if (err) return res.status(401).send(err);
			res.status(200).json({
				status: 'success',
				movie: movie,
				message: 'Updated movie'
			});
		}
	);
};

/**
 * Deletes a Movies
 * @param {string} movieId - Movie ID
 * @return {status} success
 * @throws {error} err
 */
exports.deleteMovie = function(req, res) {
	db.connect(config.database);
	Movies.findByIdAndRemove({ _id: req.params.movieId }, function(err) {
		if (err) res.status(401).send(err);
		res.status(200).json({
			status: 'success',
			message: 'Movie deleted successfully'
		});
	});
};
