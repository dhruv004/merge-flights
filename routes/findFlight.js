var express = require('express');
var router = express.Router();

var findFlightController = require('../controllers/findFlight');

router.get('/', findFlightController.merge_sources);

module.exports = router;