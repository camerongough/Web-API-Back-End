'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  User = mongoose.model('User');

  exports.register_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };

  //exports.login_user = function(req, res)

  //user_account

  //logout_user
