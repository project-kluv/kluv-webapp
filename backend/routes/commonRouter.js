var express = require('express');
var router = express.Router();

const commonController = require('../apps/common/commonController');

router.get('/getRate', commonController.get)

module.exports = router;
