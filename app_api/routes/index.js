// app_api/routes/index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/auth');

const jwtSecret = process.env.JWT_SECRET || 'ChangeThisTravlrSecret!';

// ==== JWT middleware to protect admin-only endpoints ====
const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Expecting "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    const token = parts[1];

    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // payload = { sub, username } from auth.js
        req.user = payload;
        next();
    });
};

// ==== Auth routes (public) ====
router.post('/register', authController.register); // creating users via API
router.post('/login', authController.login);       // used by Angular admin login

// ==== Trip routes ====
// GET list is public, POST is protected
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(requireAuth, tripsController.tripsAddTrip);

// GET single trip is public, PUT/DELETE are protected
router
    .route('/trips/:tripCode')
    .get(tripsController.tripByCode)
    .put(requireAuth, tripsController.tripsUpdateTrip)
    .delete(requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;
