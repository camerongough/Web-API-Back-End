'use strict';
var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  date: Date,
  start_time: {
    type: Number,
    default: 0
  },
  movie_id: {
    type: Number,
    default: 0
  }
});
