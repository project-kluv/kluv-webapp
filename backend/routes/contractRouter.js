var express = require('express');
var router = express.Router();

const controller = require('../apps/contract/contractController');

/* GET users listing. */
router.get('/getAuth/:serviceName', controller.getAuth)
// router.get('', controller.getContract)
router.get('/call', controller.callContract)


module.exports = router;
