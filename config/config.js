require('dotenv').load();

var dbUserPassword = process.env.DBUSERPASSWORD;

module.exports = {
	//dbUserPassword: process.env.DBUSERPASSWORD,
	secret: process.env.SECRET,
	database: 'mongodb://user:'+dbUserPassword+'@localhost/cinema'
};
