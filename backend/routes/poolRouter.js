var express = require('express');
var router = express.Router();

const controller = require('../apps/pool/poolController');

/* GET users listing. */
// router.get('/getAllLPPool/:swapName', controller.getAllLPPool)
router.get('/getAllTokenPrice/:swapName', controller.getAllTokenPrice)

module.exports = router;
