const express = require('express');
const router = express.Router();
var db = require('../queries/queries');
var isAuthenticated = require('./helpers').isAuthenticated;


async function Route(def, res, next) {
	try {
		let result = await def;
		res.status(200).json({
			status: 'success',
			data: result
		})
	}
	catch (exc) {
		if (process.env.NODE_ENV != "development")
			console.log(exc);
		res.status(500).json({
			status: 'failure',
			error: Object.getOwnPropertyNames(exc).reduce((obj, x) => {
				obj[x] = exc[x];
				return obj;
			}, {})
		})
	}
}

router.get('/user/:userid', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.getUser(userID), res, next);
});

router.post('/user/:userid', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.setUser(userID, req.body), res, next);
});

router.post('/user/:userid/activity', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		startDay: req.body.day || req.body.startDay,
		endDay: req.body.day || req.body.endDay,
		activity: req.body.activity,
		limit: req.body.limit || 20,
		page: req.body.page || 0,
		source: req.body.source,
	}

	Route(async function () {
		let user_activities = await db.getUserActivities(args);
		let activities = await db.getActivities({ in_set: user_activities });
		return { user_activities, activities };
	}(), res, next);
});

router.post('/user/:userid/activity/record', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		amount: req.body.amount
	}
	Route(db.recordUserActivity(args), res, next);
});

router.post('/league/:league/scores', function (req, res, next) {
	let args = {
		league: parseInt(req.params.league),
		startDay: req.body.day || req.body.startDay,
		endDay: req.body.day || req.body.endDay
	}
	Route(async function () {
		let users = await db.getUsers(args)
		let activities = await db.getActivities(args);
		let user_activities = await db.getUserActivities(Object.assign({
			user_in: users, activity_in: activities
		}, args));
		return { users, user_activities, activities };
	}(), res, next);
});

router.post('/user/:userid/activitylist', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		day: req.body.day,
		activity: req.body.activity,
		source: 'exercise'
	}
	Route(db.getActivities(args), res, next);
});

router.post('/user/:userid/activitylist/record', isAuthenticated, function (req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		active: req.body.active
	}
	Route(db.recordUserActivityList(args), res, next);
});

module.exports = router;
