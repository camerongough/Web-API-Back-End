'use strict';
var jwt = require('jsonwebtoken'),
	jwtBlacklist = require('jwt-blacklist')(jwt),
	db = require('../../config/database'),
	config = require('../../config/config'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

// exports.registerUser = function(req, res) {
// 	db.connect(config.database);
// 	var newUser = new User(req.body);
// 	newUser.save(function(err, user) {
// 		if (err) res.send(err);
// 		res.status(200).json(user);
// 	});
// };

exports.registerUser = function(req, res) {
	db.connect(config.database);
	var newUser = new User(req.body);
	newUser
		.save()
		.then(function(user) {
			res.status(201).json({
				status: 'success',
				data: user,
				message: 'Registered new user'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.authorize = function(req, res, next) {
	db.connect(config.database);
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err, decoded) {
			if (err) {
				res.send(err);
				return res.status(403).send('Error authorizing token');
			} else {
				req.token = decoded;
				res.send(decoded);
				return next();
			}
		});
	} else {
		return res.status(403).send('Not authorized');
	}
};

var createToken = function(user) {
	return jwtBlacklist.sign({ email: user.email }, config.secret, {
		expiresIn: '24h'
	});
};

exports.loginUser = function(req, res) {
	db.connect(config.database);
	User.findOne(
		{
			email: req.body.email
		},
		function(err, user) {
			if (err) throw err;
			if (!user) {
				res.status(401).send({
					success: false,
					msg: 'Authentication failed. User not found.'
				});
			} else {
				user.verifyPassword(req.body.password, function(err, isMatch) {
					if (isMatch) {
						var token = createToken(user);
						res.status(200).send({
							success: 'success',
							msg: 'Logged in.',
							token: token
						});
					} else {
						res.status(401).send({
							success: false,
							msg: 'Authentication failed. Wrong password.'
						});
					}
				});
			}
		}
	);
};

exports.checkStatus = function(req, res) {
	res.status(200).send({
		status: 'success'
	});
};

exports.logout = function(req, res) {
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err) {
			if (err) {
				return res.status(403).send('Error authorizing token');
			} else {
				jwtBlacklist.blacklist(token);
				return res.status(200).send({
					success: 'success',
					message: 'Logout successful.'
				});
			}
		});
	} else {
		{
			return res.status(403).send('Not authorized');
		}
	}
};

exports.forgotPassword = function(req, res) {
	res.status.json({
		status: 'sucess'
	});
};
