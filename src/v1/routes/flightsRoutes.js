const express = require('express');
const router = express.Router();

const ctrl = require('../../controller/flightsController');

router.get('/:id/passengers', ctrl.getPassengersAssigned);

module.exports = router;