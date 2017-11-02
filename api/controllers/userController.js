'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

exports.registerUser = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
    //res.status(200).json(user);
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

          if (isMatch && !err) {
            var token = jwt.sign({
              email: user.email,
              _id: user._id
            }, config.secret)
            res.json({
              success: true,
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
}

exports.loginUserRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

//logout_user
