const express = require('express');
const router = express.Router();
var db = require('../queries/queries');

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
			res.status(503)
				.json({
					status: 'failure',
					error: err
				})
		});
}

router.get('/user/:userid', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.getUser(userID), res, next);
});

router.post('/user/:userid', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	Route(db.setUser(userID, req.body), res, next);
});

router.post('/user/:userid/activity', function(req, res, next) {
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

router.post('/user/:userid/activity/record', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		amount: req.body.amount
	}
	Route(db.recordUserActivity(args), res, next);
});

router.post('/user/:userid/activitylist', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		day: req.body.day,
		activity: req.body.activity,
		source: 'exercise'
	}
	Route(db.getActivityList(args), res, next);
});

router.post('/user/:userid/activitylist/record', function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		active: req.body.active
	}
	Route(db.recordUserActivityList(args), res, next);
});





//router.post('/auth/login', function(req, res, next) {
	//console.log("phew, logging in, I guess.");
//})

// Define routes.
// TODO: add back to routes/index.js
/*
app.get('/',
	function(req, res, next) {
	Route({user: req.user }, res, next);
});
*/


/*
app.post('/auth/login',
	function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		active: req.body.active
	}
	Route(db.recordUserActivityList(args), res, next);
});
	passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	});

app.get('/auth/logout',
	function(req, res, next) {
	let userID = parseInt(req.params.userid);
	let args = {
		userID: userID,
		activity: req.body.activity,
		day: req.body.day,
		active: req.body.active
	}
	Route(db.recordUserActivityList(args), res, next);
});
	function(req, res){
		req.logout();
		res.redirect('/');
	});

app.get('/profile', function(req, res, next) {
	//let userID = parseInt(req.params.userid);
	//let args = {
		//userID: userID,
		//activity: req.body.activity,
		//day: req.body.day,
		//active: req.body.active
	//}
	//Route(db.recordUserActivityList(args), res, next);
	require('connect-ensure-login').ensureLoggedIn(),
		res.render('profile', { user: req.user });
	});
*/

// router.get('/user/:userid/activity/:day', db.getUserDayScore);


module.exports = router;
