'use strict';
var mongoose = require('mongoose'),
	DateOnly = require('mongoose-dateonly')(mongoose);

var ScheduleSchema = new mongoose.Schema({
	date: {
		type: DateOnly
	},
	day_week: {
		type: String
	},
	start_times: {
		type: Array
	},
	movie_id: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
