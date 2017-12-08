var express = require('express'),
	https = require('https'),
	cors = require('cors'),
	fs = require('fs'),
	app = express(),
	port = process.env.PORT || 3000,
	httpsPort = 3443,
	morgan = require('morgan'),
	bodyParser = require('body-parser');

// mongoose connection
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/cinema', {
//   useMongoClient: true
// });

var options = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
};

app.enable('etag');
app.set('etag', 'strong');

app.use(cors());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(
	morgan('dev', {
		skip: function(req, res) {
			return res.statusCode < 400;
		},
		stream: process.stderr
	})
);

app.use(
	morgan('dev', {
		skip: function(req, res) {
			return res.statusCode >= 400;
		},
		stream: process.stdout
	})
);

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

//API Models
/* eslint-disable */
var Movie = require('./api/models/movieModel'),
	User = require('./api/models/userModel'),
	MovieSchedule = require('./api/models/movieScheduleModel');
/* eslint-enable */

//API Routes
var movieRoutes = require('./api/routes/movieRoutes');
movieRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);
var authRoutes = require('./api/routes/authRoutes');
authRoutes(app);
var scheduleRoutes = require('./api/routes/scheduleRoutes');
scheduleRoutes(app);

app.listen(port);
https.createServer(options, app).listen(httpsPort);
//console.log('Cinema RESTful API server started on: ' + port + ' & ' + httpsPort);
