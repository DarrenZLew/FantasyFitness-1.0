const express = require('express');
const router = express.Router();
var db = require('../queries/queries');
// const Models = require('../models');

/* GET home page. */
// router.get('/api', function(req, res, next) {
//   Models.User.findAll()
//     .then(users => {
//       res.status(200).json({
//         users
//       })
//     })
//     .catch(err => {
//       res.status(400).json({
//         err
//       })
//     })
// });

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
router.post('/user/:userid/activity/', function(req, res, next) {
    let userID = parseInt(req.params.userid);
    let args = {
        userID: userID,
        startDay: req.body.day || req.body.startDay,
        endDay: req.body.day || req.body.endDay,
        activity: req.body.activity,
        limit: req.body.limit || 20,
        page: req.body.page || 0
    }
    Route(db.getUserActivities(args), res, next);
});
router.post('/user/:userid/activity/record', function(req, res, next) {
    let userID = parseInt(req.params.userid);
    console.log(req.body);
    let args = {
        userID: userID,
        activity: req.body.activity,
        day: req.body.day,
        amount: req.body.amount
    }
    Route(db.recordUserActivity(args), res, next);
});

// router.get('/user/:userid/activity/:day', db.getUserDayScore);


module.exports = router;
