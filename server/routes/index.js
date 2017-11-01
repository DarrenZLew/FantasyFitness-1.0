const express = require('express');
const router = express.Router();
const Models = require('../models');

/* GET home page. */
router.get('/api', function(req, res, next) {
  Models.User.findAll()
    .then(users => {
      res.status(200).json({
        users
      })
    })
    .catch(err => {
      res.status(400).json({
        err
      })
    })
});

module.exports = router;
