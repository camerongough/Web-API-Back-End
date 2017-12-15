'use strict';
/**
 * User Controller
 * @module userController
 */
var mongoose = require('mongoose'),
	db = require('../../config/database'),
	config = require('../../config/config'),
	jwt = require('jsonwebtoken'),
	jwtBlacklist = require('jwt-blacklist')(jwt),
	User = mongoose.model('User');

/**
 * Find User by ID
 * @param {string} userId - User ID
 * @returns {object} user - User Object
 * @throws {error} err
 */
exports.findUserById = function(req, res) {
	db.connect(config.database);
	User.findById(req.params.userId)
		.then(function(user) {
			res.status(200).json({
				status: 'success',
				data: user,
				message: 'Retrieved User Details By ID'
			});
		})
		.catch(function(err) {
			return res.send(err);
		});
};

/**
 * Find User by Email
 * @param {string} email - User Email
 * @return {object} user - User Object
 * @return {string} status
 * @throws {error} err
 */
exports.findUserByEmail = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	jwtBlacklist.verify(token, config.secret, function(err, decoded) {
		if (err) {
			return res.status(403).json({
				status: 'failed',
				message: 'Error authorizing token',
				error: err
			});
		} else {
			var email = decoded.email;
			User.find({ email: email })
				.then(function(user) {
					res.status(200).json({
						status: 'success',
						data: user,
						message: 'Retrieved User Details By Email'
					});
				})
				.catch(function(err) {
					res.send(err);
				});
		}
	});
};

/**
 * Add Movie to User Favourites List
 * @param {string} userId - User ID
 * @param {string} movieId - Movie ID
 * @return {object} user - User Object
 * @return {string} status
 * @throws {error} err
 */
exports.addToFavList = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	var movieList = { movieId: req.body.movieId };
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findByIdAndUpdate(
					{ _id: uid },
					{ $push: { favList: movieList } },
					function(user, err) {
						if (err) res.send(err);
						res.status(201).json({
							status: 'success',
							data: user,
							message: 'Added movie to favourites list'
						});
					}
				);
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
 * Get User Favourites List
 * @param {string} userId - User ID
 * @return {array} favList - User Favourite Movies List
 * @throws {error} err
 */
exports.getFavList = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findById(uid)
					.then(function(user) {
						var favList = user.favList;
						res.status(200).json({
							status: 'success',
							data: favList,
							message: 'Recieved User Favourite Movies List'
						});
					})
					.catch(function(err) {
						return res.send(err);
					});
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
 * Remove Movie from User Favourites List
 * @param {string} userId - User ID
 * @param {string} movieId - Movie ID
 * @return {object} user - User Object
 * @throws {error} err
 */
exports.removeFromFavList = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findByIdAndUpdate(
					{ _id: uid },
					{ $pull: { favList: { movieId: req.body.movieId } } },
					function(user, err) {
						if (err) res.send(err);
						res.status(200).json({
							status: 'success',
							data: user,
							message: 'Removed Movie from Favourites List'
						});
					}
				);
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
 * Add Movie to User Watch List
 * @param {string} userId - User ID
 * @param {string} movieId - Movie ID
 * @return {object} user - User Object
 * @throws {error} err
 */
exports.addToWatchList = function(req, res) {
	db.connect(config.database);

	var token = req.headers.authorization;
	//console.log(token);
	var movieList = { movieId: req.body.movieId };
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findByIdAndUpdate(
					{ _id: uid },
					{ $push: { watchList: movieList } },
					function(user, err) {
						if (err) return res.send(err);

						return res.status(201).json({
							status: 'success',
							data: user,
							message: 'Added movie to Watch List'
						});
					}
				);
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
 * Get User Watch List
 * @param {string} userId - User ID
 * @return {array} watchList - User Watch List
 * @throws {error} err
 */
exports.getWatchList = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findById(uid)
					.then(function(user) {
						var watchList = user.watchList;
						res.status(200).json({
							status: 'success',
							data: watchList,
							message: 'Recieved User Watch List'
						});
					})
					.catch(function(err) {
						return res.send(err);
					});
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
 * Remove Movie from User Watch List
 * @param {string} userId - User ID
 * @param {string} movieId - Movie ID
 * @return {object} user - User Object
 * @return {string} status
 * @throws {error} err
 */
exports.removeFromWatchList = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findByIdAndUpdate(
					{ _id: uid },
					{ $pull: { watchList: { movieId: req.body.movieId } } },
					function(user, err) {
						if (err) res.send(err);
						res.status(200).json({
							status: 'success',
							data: user,
							message: 'Removed Movie from Watch List'
						});
					}
				);
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};
/**
 * Delete User
 * @param {string} userId - User ID
 * @return {string} status
 * @throws {error} err
 */
exports.deleteUser = function(req, res) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403).json({
					status: 'failed',
					message: 'Error authorizing token',
					error: err
				});
			} else {
				var uid = decoded.uid;
				User.findByIdAndRemove({ _id: uid }, function(err) {
					if (err) res.send(err);
					res.status(200).json({
						status: 'success',
						message: 'User deleted'
					});
				});
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};
