// app_server/routes/travel.js
const express = require('express');
const router = express.Router();
const travelerCtrl = require('../controllers/traveler');

// public pages
router.get('/', travelerCtrl.home);          // renders home.hbs
router.get('/list', travelerCtrl.travelList);// renders travel-list.hbs

module.exports = router;
