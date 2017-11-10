var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  User = mongoose.model('User');

var secret = require('../../config/config');

exports.registerUser = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.status(200).json(user);
  });
};

exports.authorize = function(req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.secret, function(err, decoded) {
      if (err) {
        console.console.error(err);
        return res.status(403).send('error authorizing token');
      } else {
        req.token = decoded;
        return next();
      }
    });
  } else {
    console.error('not authorized');
    return res.sendStatus(403);
  }
};

createToken = function(user) {
  return jwt.sign(_.omit(user.attributes, 'password'), secret.secret, {
    expiresIn: 24 * 60 * 60
  });
};

exports.loginUser = function(req, res) {
  User.findOne({
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
    });
};

exports.checkStatus = function(req, res) {
  res.status(200).send({
    status: 'success'
  });
};
