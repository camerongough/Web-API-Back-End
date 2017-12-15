'use strict';
module.exports = function(app) {
	var user = require('../controllers/userController');
	var auth = require('../controllers/authController');

	app
		.route('/api/v1/user')
		.get(auth.authorize, user.findUserByEmail);

	app
		.route('/api/v1/user/:userId')
		.get(auth.authorize, user.findUserById)
		.delete(auth.authorize, user.deleteUser);
	//.patch(auth.authorize, user.updateUserDetails)

	app
		.route('/api/v1/user/favourite_list')
		.get(user.getFavList)
		.post(user.addToFavList)
		.put(user.removeFromFavList);

	app
		.route('/api/v1/user/watch_list')
		.get(user.getWatchList)
		.post(user.addToWatchList)
		.put(user.removeFromWatchList);
};
