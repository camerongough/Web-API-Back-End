require('dotenv').load();

module.exports = {
	dbUserPassword: process.env.DBUSERPASSWORD,
	secret: process.env.SECRET,
	database: 'mongodb://localhost/cinema'
};
