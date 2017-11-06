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
function getUser(userID) {
	return db.one('SELECT * FROM users WHERE id = $1', userID)
		.then(function (user) {
			unSafeUserKeys.forEach((key) => delete user[key]);
			return user;
		});
}

function setUser(userID, userData) {
	return db.none('UPDATE users SET bio=$2 WHERE id = $1',
		[userID, userData.bio]);
}

function getUserActivities(args) {
	let {startDay, endDay, activity} = args;
	let query = 'SELECT * FROM user_activity_day where "user" = $[userID]';
	if(endDay)
		query += ' and day <= $[endDay]::date';
	if(startDay)
		query += ' and day >= $[startDay]::date';
	if(activity)
		query += ' and activity = $[activity]';
	return db.any(query, args);
}

function recordUserActivity(args) {

	return db.one(`INSERT INTO user_activity_day ("user", activity, day, amount) VALUES
		($[userID], $[activity], $[day], $[amount]) ON CONFLICT ON CONSTRAINT single_user_activity_day
		DO UPDATE set amount = user_activity_day.amount + $[amount] RETURNING amount`, args);
}

module.exports = {
  getUser: getUser,
  setUser: setUser,
  getUserActivities: getUserActivities,
  recordUserActivity: recordUserActivity
};