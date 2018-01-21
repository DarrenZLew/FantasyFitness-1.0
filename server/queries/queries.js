const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	connection = process.env.DATABASE_URL;
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

function setNewUser(args) {
	let {userID, hash, email} = args;
	args['salt'] = "Nothing New";
	return db.none(`INSERT INTO users ("name", email, hash, salt) VALUES
		($[userID], $[email], $[hash], $[salt])`, args);
}


// TODO: this is mostly untested. Also, I'm conflating username and email
function getUserByUserName(username) {
	return db.one('SELECT * FROM users WHERE email = $1', username)
		.then(function (user) {
			// TODO: what is this?
			unSafeUserKeys.forEach((key) => delete user[key]);
			return user;
		});
}

function getUserActivities(args) {
	let {startDay, endDay, activity, source} = args;
	let query = `SELECT activities.id as activity, activities.*, uad.id, uad.user, uad.day, uad.amount, uad.active FROM activities
	             LEFT JOIN user_activity_day uad ON uad.activity = activities.id
	             WHERE (uad.active IS NULL OR ("user" = $[userID] AND uad.active = true`;
	if(endDay)
		query += ' and day <= $[endDay]::date';
	if(startDay)
		query += ' and day >= $[startDay]::date';
	query += '))';
	if(activity)
		query += ' and activity = $[activity]';
	if(source)
		query += ' and source = $[source]';
	return db.any(query, args);
}

function recordUserActivity(args) {
	return db.one(`INSERT INTO user_activity_day ("user", activity, day, amount) VALUES
		($[userID], $[activity], $[day], $[amount]) ON CONFLICT ON CONSTRAINT single_user_activity_day
		DO UPDATE set amount = $[amount] RETURNING amount`, args);
}

function getActivityList(args) {
	let {day, activity, source} = args;
	let query = `SELECT activities.id as activity, activities.*, uad.id, uad.user, uad.day, uad.amount, uad.active FROM activities
							 LEFT JOIN user_activity_day uad ON uad.activity = activities.id
							 WHERE (uad.active is NULL OR ("user" = $[userID]`;
	if(day)
		query += ' and day = $[day]::date';
	query += '))';
	if (activity)
		query += ' and activity = $[activity]';
	if (source)
		query += ' and source = $[source]';
	return db.any(query, args);
}

function recordUserActivityList(args) {
	return db.one(`INSERT INTO user_activity_day ("user", activity, day, active) VALUES
		($[userID], $[activity], $[day], $[active]) ON CONFLICT ON CONSTRAINT single_user_activity_day
		DO UPDATE set active = $[active] RETURNING active`, args);
}

module.exports = {
  getUser: getUser,
  getUserByUserName: getUserByUserName,
  setNewUser: setNewUser,
  getUserActivities: getUserActivities,
  recordUserActivity: recordUserActivity,
  getActivityList: getActivityList,
  recordUserActivityList: recordUserActivityList
};
