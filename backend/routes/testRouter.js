var express = require('express');
var router = express.Router();

const tokenController = require('../apps/token/tokenController');

/* GET users listing. */
router.get('/insert/:address/:price', tokenController.insert)
router.get('/test', tokenController.test)

module.exports = router;
