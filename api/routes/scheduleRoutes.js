'use strict';
module.exports = function(app) {
	var schedule = require('../controllers/scheduleController');

	app
		.route('/api/v1/schedule')
		.post(schedule.addMovieSchedule)
		.get(schedule.showAllSchedules);

	app.route('/api/v1/schedule/:movieId').get(schedule.showMovieSchedule);
	//.put(schedule.updateMovieSchedule)
	//.delete(schedule.deleteMovieSchedule)
};
