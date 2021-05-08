var express = require('express');
var router = express.Router();

const controller = require('../apps/account/accountController');

/* GET users listing. */
router.get('/getInfo/:account', controller.getAccountInfo)


module.exports = router;
