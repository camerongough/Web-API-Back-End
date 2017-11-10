'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  var auth = require('../controllers/authController');

  app.route('/api/v1/user/:userId')
    .get(auth.authorize, user.findUserById);

};
