const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
// const Sequelize = require('sequelize');

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	
	// Figure out heroku prod deployment later
}
let	db = pgp(connection);

function getUser(req, res, next) {
	let userID = parseInt(req.params.userid);
	db.one('SELECT * FROM users WHERE id = $1', userID)
		.then(function (data) {
			res.status(200)
				.json({
					status: 'success',
					user: data,
				})
		})
		.catch(function (err) {
			return next(err)
		});
}

function setUser(req, res, next) {
	let userID = parseInt(req.params.userid);
	db.none('UPDATE users SET bio=$1 ', req.body.bio)
		.then(function (data) {
			res.status(200)
				.json({
					status: 'success',
				})
		})
		.catch(function (err) {
			return next(err)
		});
}

module.exports = {
  getUser: getUser,
  setUser: setUser
};