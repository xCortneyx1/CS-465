// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// /api/trips  -> list + add
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// /api/trips/:tripCode  -> get one, update, delete (by code)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);

module.exports = router;
