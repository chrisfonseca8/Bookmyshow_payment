const express = require('express');

const router = express.Router();
const {seatControllers} = require('../../controllers')


router.get('/',seatControllers.allSeats);


module.exports = router;