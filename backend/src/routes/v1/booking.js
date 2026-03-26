const express = require('express');
const router = express.Router();

const {bookingControllers} = require('../../controllers')
router.post('/start',bookingControllers.initateBookingController);

router.post('/confirm',bookingControllers.confirmBookingController)


module.exports = router