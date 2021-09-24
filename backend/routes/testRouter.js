var express = require('express');
var router = express.Router();

const tokenController = require('../apps/token/tokenController');

/* GET users listing. */
router.get('/insert/:address/:price', tokenController.insert)
router.get('/get/:address', tokenController.get)

module.exports = router;
