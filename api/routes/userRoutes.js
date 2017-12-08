'use strict';
module.exports = function(app) {
	var user = require('../controllers/userController');
	var auth = require('../controllers/authController');

	app
		.route('/api/v1/user/:userId')
		.get(auth.authorize, user.findUserById)
		.delete(user.deleteUser);
	//.patch(auth.authorize, user.updateUserDetails)


	// app.route('/api/v1/user/:userId/favourite_list')
	//   .get(user.getFavMovieList)
	//   .post(user.addToFavMovieList);
	//
	app
		.route('/api/v1/user/:userId/watch_list')
		.get(user.getWatchList)
		.post(user.addToWatchList)
		.put(user.removeFromWatchList);
};
