'use strict';
/**
 * Schedule Controller
 * @module scheduleController
 */
var mongoose = require('mongoose'),
	Schedule = mongoose.model('Schedule'),
	db = require('../../config/database'),
	config = require('../../config/config');

/**
* Add movie schedule
* @param {object} Schedule - Schedule Object
* @return {object} schedule - Schedule Object
* @return {status}
* @throws {error} err
*/
exports.addMovieSchedule = function(req, res) {
	db.connect(config.database);
	var newSchedule = new Schedule(req.body);
	newSchedule
		.save()
		.then(function(schedule) {
			res.status(201).json({
				status: 'success',
				data: schedule,
				message: 'Added New Movie Schedule'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
};

/**
* Show all movie schedules
* @return {object} schedule - Schedule Object
* @return {status}
* @throws {error} err
*/
exports.showAllSchedules = function(req, res) {
	db.connect(config.database);
	Schedule.find(req.query)
		.then(function(schedule) {
			res.status(200).json({
				status: 'success',
				data: schedule,
				message: 'Retrieved All Movie Schedule'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
};

/**
* Show move schedule
* @param {string} movieId - Movie ID
* @return {object} movieSchedule - Schedule Object matching with Movie ID
* @return {status}
* @throws {error} err
*/
exports.showMovieSchedule = function(req, res) {
	//console.log(req.params.movieId);
	db.connect(config.database);
	Schedule.find({ movie_id: req.params.movieId }, function(err, movieSchedule) {
		if (err) res.send(err);

		res.status(200).json({
			status: 'status',
			schedule: movieSchedule,
			message: 'Retrieved Movie Schedule'
		});
	});
	// Schedule.find({movie_id: req.params.movieId})
	//   .then(function(shedule) {
	//     res.status(200).json({
	//       status: 'success',
	//       data: schedule,
	//       message: 'Retrieved Movie Schedule'
	//     });
	//   })
	//   .catch(function(err) {
	//     res.send(err);
	//   });
};
