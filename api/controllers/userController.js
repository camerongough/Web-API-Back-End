'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  FavList = mongoose.model('UserFavList'),
  WatchList = mongoose.model('UserWatchList');

exports.findUserById = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
