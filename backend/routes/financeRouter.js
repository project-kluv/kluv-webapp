var express = require('express');
var router = express.Router();

const controller = require('../apps/finance/financeController');

/* GET users listing. */
router.get('/getAllLPPool/:swapName', controller.getAllLPPool)


module.exports = router;
