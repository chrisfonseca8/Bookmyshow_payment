const express = require('express');
const router = express.Router()

const {detailController} = require('../../controllers');

router.get('/movie/:id',detailController.getMovieDetails)

module.exports = router