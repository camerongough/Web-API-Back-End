var mongoose = require('mongoose');

exports.connect = function(conData) {
	mongoose.Promise = require('bluebird');
	mongoose.connect(conData, {
		useMongoClient: true
	});
};
