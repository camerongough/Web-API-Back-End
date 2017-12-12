'use strict';

var mongoose = require('mongoose'),
	db = require('../../config/database'),
	config = require('../../config/config'),
	User = mongoose.model('User');

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

exports.findUserByEmail = function(req, res) {
	db.connect(config.database);
	User.find({ email: req.body.email })
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
};

exports.addToFavList = function(req, res) {
	db.connect(config.database);
	var movieList = { movieId: req.body.movieId };
	User.findByIdAndUpdate(
		{ _id: req.params.userId },
		{ $push: { favList: movieList } },
		function(user, err) {
			if (err) res.send(err);
			res.status(201).json({
				status: 'success',
				data: user,
				message: 'Added movie to Favs List'
			});
		}
	);
};

exports.getFavList = function(req, res) {
	db.connect(config.database);
	User.findById(req.params.userId)
		.then(function(user) {
			var favList = user.favList;
			res.status(200).json({
				status: 'success',
				data: favList,
				message: 'Recieved User Fav List'
			});
		})
		.catch(function(err) {
			return res.send(err);
		});
};

exports.removeFromFavList = function(req, res) {
	db.connect(config.database);
	User.findByIdAndUpdate(
		{ _id: req.params.userId },
		{ $pull: { favList: { movieId: req.body.movieId } } },
		function(user, err) {
			if (err) res.send(err);
			res.status(200).json({
				status: 'success',
				data: user,
				message: 'Removed Movie from Fav List'
			});
		}
	);
};

exports.addToWatchList = function(req, res) {
	db.connect(config.database);
	var movieList = { movieId: req.body.movieId };
	User.findByIdAndUpdate(
		{ _id: req.params.userId },
		{ $push: { watchList: movieList } },
		function(user, err) {
			if (err) res.send(err);
			res.status(201).json({
				status: 'success',
				data: user,
				message: 'Added movie to Watch List'
			});
		}
	);
};

exports.getWatchList = function(req, res) {
	db.connect(config.database);
	User.findById(req.params.userId)
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
};

exports.removeFromWatchList = function(req, res) {
	db.connect(config.database);
	User.findByIdAndUpdate(
		{ _id: req.params.userId },
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
};

exports.deleteUser = function(req, res) {
	db.connect(config.database);
	User.findByIdAndRemove({ _id: req.params.userId }, function(err) {
		if (err) res.send(err);
		res.status(200).json({
			status: 'success',
			message: 'User deleted'
		});
	});
};
