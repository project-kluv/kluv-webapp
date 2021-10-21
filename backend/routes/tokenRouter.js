var express = require('express');
var router = express.Router();

const tokenController = require('../apps/token/tokenController');

/* GET users listing. */
router.get('/insert/:address/:price', tokenController.insert)
router.get('/getChartData/:address', tokenController.getChartData)
router.get('/getAllCurrentTokenPrice', tokenController.getCurrentTokenPrice)
router.get('/getOneTokenPrice/:symbol', tokenController.getOneCurrentTokenPrice)
router.get('/getAllCexPrice', tokenController.getAllCexPrice)
router.get('/test', tokenController.test)

module.exports = router;
