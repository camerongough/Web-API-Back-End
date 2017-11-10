'use strict';
module.exports = function(app) {
  var auth = require('../controllers/authController');
  var user = require('../controllers/userController');

  // auth Routes
  app.route('/api/v1/auth/register')
    .post(auth.registerUser);

  app.route('/api/v1/auth/login')
    .post(auth.loginUser);

  app.route('/api/v1/auth/status')
    .get(auth.authorize, auth.checkStatus);

};
