var express = require('express');
var router = express.Router();

const controller = require('../apps/pool/poolController');
const test = require('../apps/test/testController')

/* GET users listing. */
// router.get('/getAllLPPool/:swapName', controller.getAllLPPool)
router.get('/getAllTokenPrice/:swapName', controller.getAllTokenPrice)
router.get('/test/:name/:price', test.mongoTest)

module.exports = router;
