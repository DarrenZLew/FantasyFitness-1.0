const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
// const Sequelize = require('sequelize');

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	
	// Figure out heroku prod deployment later
}
let	db = pgp(connection);

let unSafeUserKeys = ['hash', 'salt'];
function getUser(userid) {
	return db.one('SELECT * FROM users WHERE id = $1', userid)
		.then(function (user) {
			unSafeUserKeys.forEach((key) => delete user[key]);
			return user;
		});
}

function setUser(userid, userData) {
	return db.none('UPDATE users SET bio=$2 WHERE id = $1',
		[userid, userData.bio]);
}

module.exports = {
  getUser: getUser,
  setUser: setUser
};