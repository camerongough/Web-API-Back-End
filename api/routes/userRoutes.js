'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // user Routes
  app.route('/register')
    .post(user.registerUser);

  app.route('/login')
  .post(user.loginUser);

  //app.get('/logout')
    //.get(user.logout_user);

};
