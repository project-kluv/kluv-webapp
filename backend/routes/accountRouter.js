var express = require('express');
var router = express.Router();

const accountController = require('../apps/account/accountController');
const balanceController = require('../apps/balance/balanceController');

/* GET users listing. */
// router.get('/getInfo/:account', accountController.getAccountInfo)
router.get('/balance/:account', balanceController.getBalance)


module.exports = router;
