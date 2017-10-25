'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // user Routes
  app.route('/register')
    .post(user.register_user);

  //app.route('/login')
  //.post(user.login);

  //app.route('/user/:email')
  //.get(user.user_account);

  //app.get('/logout')
    //.get(user.logout_user);

};
