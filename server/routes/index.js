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

router.get('/user/:userid', function(req, res, next) {
    let userID = parseInt(req.params.userid);
    db.getUser(userID)
        .then(function (user) {
            res.status(200)
                .json({
                    status: 'success',
                    user: user,
                });
        })
        .catch(function (err) {
            return next(err);
        });
});
router.post('/user/:userid', function(req, res, next) {
    let userID = parseInt(req.params.userid);
    db.setUser(userID, req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                })
        })
        .catch(function (err) {
            return next(err)
        });
});

// router.get('/user/:userid/activity/:day', db.getUserDayScore);


module.exports = router;
