const express = require('express');

const router = express.Router();
const {seatControllers} = require('../../controllers')


router.get('/',seatControllers.allSeats);

router.post('/status',seatControllers.checkSeatAvailability)


module.exports = router;