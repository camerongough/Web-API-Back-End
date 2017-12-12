'use strict';
/**
 * Auth Controller
 * @module authController
 */
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
/**
* Registers User
* @param {object} User - User Object
* @return {object} user - User Object
* @return {status}
* @throws {error} err
*/
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

/**
* Authorizes users
* @param {string} authorization - Authorization header
* @return {object} decoded - Decoded token
* @return {status}
* @throws {error} err
*/
exports.authorize = function(req, res, next) {
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
				req.token = decoded;
				return next();
			}
		});
	} else {
		return res.status(403).json({
			message: 'Not authorized'
		});
	}
};

/**
* Check if admin
* @param {string} authorization - Authorization header
* @return {object} decoded - Decoded token
* @return {status}
* @throws {error} err
*/
exports.isAdmin = function(req, res, next){
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
				if (decoded.role != 'admin') {
					res.status(401).json({
						status: 'failed',
						message: 'Not authorized'
					});
				}else{
					req.token = decoded;
					return next();
				}
			}
		});
	} else {
		return res.status(403).json({
			status: 'failed',
			message: 'Not authorized'
		});
	}
};

/**
* Creates a JWT token
* @param {object} user - User Object
* @return {string} token - JWT token with email and role as payload
*/
var createToken = function(user) {
	return jwtBlacklist.sign({ email: user.email, role: user.role }, config.secret, {
		expiresIn: '24h'
	});
};

/**
* Login user
* @param {string} email - User Email
* @param {string} password - User Password
* @return {string} token - JWT token
* @throws {error} err
*/
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
/**
* Logout User and Blacklists JWT Token
* @param {string} authorization - Authorization header
* @returns {status} 
* @throws {error} err
*/
exports.logout = function(req, res) {
	var token = req.headers.authorization;
	if (token) {
		jwtBlacklist.verify(token, config.secret, function(err) {
			if (err) {
				return res.status(403).send('Error authorizing token');
			} else {
				jwtBlacklist.blacklist(token);
				return res.status(200).send({
					status: 'success',
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

/**
* User Forgot Password
*/
exports.forgotPassword = function(req, res) {
	res.status.json({
		status: 'sucess'
	});
};
