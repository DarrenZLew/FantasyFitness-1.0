const express = require('express');
const router = express.Router();
var db = require('../queries/queries');
var isAuthenticated = require('./helpers').isAuthenticated;
const passport = require('../app').passport;
const bcrypt = require('../app').bcrypt;


function Route(def, res, next) {
	return def
		.then(function(data) {
			let body = {status: 'success'};
			if(data)
				body.data = data;
			res.status(200)
				.json({
					status: 'success',
					data: data
				})
		})
		.catch(function (err) {
			if(process.env.NODE_ENV != "development")
				console.log(err);
			res.status(503)
				.json({
					status: 'failure',
					error: Object.getOwnPropertyNames(err).reduce((obj, x) => {
						obj[x] = err[x];
						return obj;
					}, {})
				})
		});
}

router.post('/auth/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/FAILURE', // TODO: make better/work
	//failureFlash: true
}));

router.post('/auth/signup', function(req, res, next) {
	let userID = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	const saltRounds = 5;
	let args = {};

	bcrypt.genSalt(saltRounds, function(err, salt) {
    	bcrypt.hash(password, salt, function(err, hash) {
	        args.userID = userID;
			args.hash = hash;
			args.email = email;
			args.salt = salt;

			console.log(args);
		    Route(db.setNewUser(args), res, next);
		});	
	});
	//console.log(args);
});

router.get('/user/:userid', isAuthenticated, function(req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.getUser(userID), res, next);
});

router.post('/user/:userid', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.setUser(userID, req.body), res, next);
});

router.post('/user/:userid/password/:password/record', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let password = parseInt(req.params.password);

	let args = {
		userID: userID,
		password: password
	}
	Route(db.recordUserActivityList(args), res, next);
});

router.post('/user/:userid/activity', isAuthenticated, function(req, res, next) {
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
	Route(db.getUserActivities(args), res, next);
});

router.post('/user/:userid/activity/record', isAuthenticated, function(req, res, next) {
	console.log("nolo");
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		amount: req.body.amount
	}
	Route(db.recordUserActivity(args), res, next);
});

router.post('/user/:userid/activitylist', isAuthenticated, function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		day: req.body.day,
		activity: req.body.activity,
		source: 'exercise'
	}
	Route(db.getActivityList(args), res, next);
});

router.post('/user/:userid/activitylist/record', isAuthenticated, function(req, res, next) {
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
