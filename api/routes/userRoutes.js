'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  var auth = require('../controllers/authController');

  app.route('/api/v1/user/:userId')
    .get(auth.authorize, user.findUserById);

  // app.route('/api/v1/user/favourite_list')
  //   .get(user.getFavMovieList)
  //   .post(user.addToFavMovieList);
  //
  // app.route('/api/v1/user/watch_list')
  //   .get(user.getWatchList)
  //   .post(user.addToWatchList);

};
