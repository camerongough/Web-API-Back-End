'use strict';
module.exports = function(app) {
	var schedule = require('../controllers/scheduleController'),
		auth = require('../controllers/authController');

	app
		.route('/api/v1/schedule')
		.post(auth.isAdmin, schedule.addMovieSchedule)
		.get(schedule.showAllSchedules);

	app
		.route('/api/v1/schedule/:movieId')
		.get(schedule.showMovieSchedule);
	//.put(schedule.updateMovieSchedule)
	//.delete(schedule.deleteMovieSchedule)
};
