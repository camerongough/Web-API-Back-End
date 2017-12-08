'use strict';
var mongoose = require('mongoose'),
	DateOnly = require('mongoose-dateonly')(mongoose),
	bcrypt = require('bcrypt');

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
	name: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: DateOnly,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	modified: {
		type: Date,
		default: Date.now
	},
	favList: {
		type: Array,
		default: []
	},
	watchList: {
		type: Array,
		default: []
	},
	admin: {
		type: Boolean,
		default: false
	}
});

//Hash a password before saving it to the database
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

//verifing the password from the database against what the user enters
UserSchema.methods.verifyPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		//console.log('Password checked');
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
