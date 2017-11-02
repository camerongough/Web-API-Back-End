require('dotenv').load();

module.exports = {
  'secret': process.env.SECRET,
  'database': 'mongodb://localhost/cinema'
};
