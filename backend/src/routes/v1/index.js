const express = require('express');
const router = express.Router();
const {info_check_controller} = require('../../controllers');


router.get('/info',info_check_controller.checking);


module.exports= router 