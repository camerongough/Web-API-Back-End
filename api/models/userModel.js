var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }

});

//watch_list: [{movie_title: String, movie_id: Number}],
//fav_list: [{movie_title: String, movie_id: Number}],


//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//verifing the password from the database against what the user enters
UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch){
    //console.log('Password checked');
    if(err) return callback(err);
    callback(null, isMatch);
  });
};

// userSchema.methods.generateJwt = function() {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);
//
//   return jwt.sign({
//     _id: this._id,
//     email: this.email,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

module.exports = mongoose.model('User', UserSchema);
