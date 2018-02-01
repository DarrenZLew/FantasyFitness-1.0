const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const {users, activities, activity_league, uad, user_league} =
	require('./db_schema');

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';
let CAST = uad.id.cast().__proto__.constructor;
let PARAMETER = uad.id.equals("faff").right.__proto__.constructor;

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	connection = process.env.DATABASE_URL;
}
let	db = pgp(connection);

let unSafeUserKeys = ['hash', 'salt'];
function getUser(userID) {
	var q = users.select(users.star())
		.from(users)
		.where(users.id.equals(userID))
		.toQuery()
	return db.one(q.text, q.values)
		.then(function (user) {
			unSafeUserKeys.forEach((key) => delete user[key]);
			return user;
		});
}

function setUser(userID, userData) {
	return db.none('UPDATE users SET bio=$2 WHERE id = $1',
		[userID, userData.bio]);
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

function getLeagueScores(args) {
	let {leagueID, startDay, endDay} = args;
	var qWhere = activity_league.league.equals(leagueID);
	if(startDay)
		qWhere = qWhere.and(uad.day.gte(new CAST(new PARAMETER(startDay), 'date')));
	if(endDay)
		qWhere = qWhere.and(uad.day.lte(new CAST(new PARAMETER(endDay), 'date')));
	let q = uad
		.select(uad.star())
		.from(user_league
			.join(activity_league).on(user_league.league.equals(activity_league.league))
			.join(uad).on(user_league.user.equals(uad.user).and(uad.activity.equals(activity_league.activity)))
			)
		.where(qWhere)
		.toQuery();
	console.log(q.text);
	return db.any(q.text, q.values);
}

module.exports = {
  getUser: getUser,
  getUserByUserName: getUserByUserName,
  setUser: setUser,
  getUserActivities: getUserActivities,
  recordUserActivity: recordUserActivity,
  getActivityList: getActivityList,
  recordUserActivityList: recordUserActivityList,
  getLeagueScores: getLeagueScores
};
