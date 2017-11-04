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

router.get('/user/:userid', db.getUser);
router.post('/user/:userid', db.setUser);

// router.get('/user/:userid/activity/:day', db.getUserDayScore);


module.exports = router;
