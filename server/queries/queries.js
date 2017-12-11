const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const {users, activities, activity_league, uad} =
	require('./db_schema');

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	
	// Figure out heroku prod deployment later
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
	//if(startDay)
	//	qWhere = qWhere.and(uad.day.gte(startDay.cast('date')));
	//if(endDay)
	//	qWhere = qWhere.and(uad.day.lte(endDay.cast('date')));
	let q = uad
		.select(uad.star())
		.from(activity_league
			.join(uad).on(activity_league.activity.equals(uad.activity))
		)
		.where(qWhere)
		.toQuery();
	return db.any(q.text, q.values);
}

module.exports = {
  getUser: getUser,
  setUser: setUser,
  getUserActivities: getUserActivities,
  recordUserActivity: recordUserActivity,
  getActivityList: getActivityList,
  recordUserActivityList: recordUserActivityList,
  getLeagueScores: getLeagueScores
};