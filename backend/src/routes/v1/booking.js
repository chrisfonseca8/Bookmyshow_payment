const express = require('express');
const router = express.Router();

const {bookingControllers} = require('../../controllers')
router.post('/start',bookingControllers.initateBookingController);

router.post('/payment',bookingControllers.confirmPaymentController)

router.post('/confirm',bookingControllers.confirmBooking)


module.exports = router