const express = require('express');
const router = express.Router();
const {info_check_controller} = require('../../controllers');
const bookingRoutes = require('./booking');
const seatRoutes = require('./seats')
const detailRoutes = require('./detailRoutes')

router.get('/info',info_check_controller.checking);
router.use('/booking',bookingRoutes);
router.use('/seats',seatRoutes);
router.use('/details',detailRoutes);

module.exports= router 