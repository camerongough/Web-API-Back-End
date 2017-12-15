'use strict';
var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate');

var MoviesSchema = new mongoose.Schema({
	movie_id: {
		type: Number,
		default: 0
	},
	title: {
		type: String,
		default: ''
	},
	certification: {
		type: String,
		default: ''
	},
	release_date: {
		type: Date
	},
	overview: {
		type: String,
		default: ''
	},
	runtime: {
		type: Number,
		default: 0
	},
	poster_path: {
		type: String,
		default: ''
	},
	homepage: {
		type: String,
		default: ''
	},
	director: {
		type: String,
		default: ''
	},
	cast: [
		{
			type: String,
			default: ''
		}
	]
});

MoviesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movies', MoviesSchema);
