var express = require('express');
var router = express.Router();

const rewardController = require('../apps/reward/rewardController');

/* GET users listing. */
router.get('/ExpectedLPReturn/:swapName', rewardController.getExpectedLPReturn)

module.exports = router;
