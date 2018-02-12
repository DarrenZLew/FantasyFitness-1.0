const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const { users, activities, activity_league, uad, user_league } =
	require('./db_schema');

let connection = 'postgres://postgres:pass123@localhost:5432/ffitness';
let CAST = uad.id.cast().__proto__.constructor;
let PARAMETER = uad.id.equals("faff").right.__proto__.constructor;

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	connection = process.env.DATABASE_URL;
}
let db = pgp(connection);

function parseInSet(in_set, keys) {
	return in_set.map((val, i, arr) => {
		if (val instanceof Object) {
			let key = keys.find((key) => key in val);
			return val[key];
		}
		return val;
	});
}

let unSafeUserKeys = ['hash', 'salt'];
function getUsers(args) {
	let { user, league, in_set } = args;
	var q = users.select(users.star())
		.from(users.join(user_league).on(users.id.equals(user_league.user)));
	if (league) {
		q = q.where(user_league.league.equals(league));	
	}
	if (user) {
		q = q.where(users.id.equals(user));
	}
	q = q.toQuery()
	return db.any(q.text, q.values)
		.then(function (user) {
			unSafeUserKeys.forEach((key) => delete user[key]);
			return user;
		});
}
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
	let { startDay, endDay, activity, source, user_in, activity_in } = args;
	let query = uad.select(uad.star()).from(uad);
	if (startDay)
		query = query.where(uad.day.gte(new CAST(new PARAMETER(startDay), 'date')));
	if (endDay)
		query = query.where(uad.day.lte(new CAST(new PARAMETER(endDay), 'date')));
	if (activity)
		query = query.where(uad.activity.equals(activity))
	if (user_in) {
		user_inset = parseInSet(user_in, ['id']);
		query = query.where(uad.user.in(user_inset));
	}
	if (activity_in) {
		activity_inset = parseInSet(activity_in, ['id']);
		query = query.where(uad.activity.in(activity_inset));
	}
	query.order(uad.user).order(uad.activity);
	query = query.toQuery();
	return db.any(query.text, query.values);
}

function recordUserActivity(args) {
	return db.one(`INSERT INTO user_activity_day ("user", activity, day, amount) VALUES
		($[userID], $[activity], $[day], $[amount]) ON CONFLICT ON CONSTRAINT single_user_activity_day
		DO UPDATE set amount = $[amount] RETURNING amount`, args);
}

function getActivities(args) {
	let { type, in_set, league, source } = args;
	let query = activities.select(activities.star())
		.from(activities.join(activity_league).on(activity_league.activity.equals(activities.id)));
	if (type)
		query = query.where(activities.type.equals(type));
	if (in_set) {
		in_set = parseInSet(in_set, ['activity']);
		query = query.where(activities.id.in(in_set));
	}
	if (source)
		query = query.where(activities.source.equals(source));
	if (league) {
		query = query.where(activity_league.league.equals(league));
	}
	query = query.toQuery();
	return db.any(query.text, query.values);
}

function recordUserActivityList(args) {
	return db.one(`INSERT INTO user_activity_day ("user", activity, day, active) VALUES
		($[userID], $[activity], $[day], $[active]) ON CONFLICT ON CONSTRAINT single_user_activity_day
		DO UPDATE set active = $[active] RETURNING active`, args);
}

function getLeagueScores(args) {
	let { leagueID, startDay, endDay } = args;
	var qWhere = activity_league.league.equals(leagueID);
	if (startDay)
		qWhere = qWhere.and(uad.day.gte(new CAST(new PARAMETER(startDay), 'date')));
	if (endDay)
		qWhere = qWhere.and(uad.day.lte(new CAST(new PARAMETER(endDay), 'date')));
	let q = uad
		.select(uad.star())
		.from(user_league
			.join(activity_league).on(user_league.league.equals(activity_league.league))
			.join(uad).on(user_league.user.equals(uad.user).and(uad.activity.equals(activity_league.activity)))
		)
		.where(qWhere)
		.toQuery();
	return db.any(q.text, q.values);
}

module.exports = {
	getUsers,
	getUser,
	getUserByUserName,
	setUser,
	getUserActivities,
	recordUserActivity,
	getActivities,
	recordUserActivityList,
	getLeagueScores
};
