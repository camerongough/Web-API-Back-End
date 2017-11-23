"use strict";
var mongoose = require("mongoose");

var userMovieWatchList = new mongoose.Schema({
  movie_id: {
    type: Number
  },
  user_email: {
    type: String
  }
});

module.exports = mongoose.model("UserWatchList", userMovieWatchList);
