'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MoviesSchema = new Schema({
  movie_id: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ""
  },
  certification: {
    type: String,
    default: ""
  },
  release_date: {
    type: Date
  },
  overview: {
    type: String,
    default: ""
  },
  runtime: {
    type: Number,
    default: 0
  },
  poster_path: {
    type: String,
    default: ""
  },
  homepage: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Movies', MoviesSchema);
