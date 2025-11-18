// app_api/controllers/trips.js
const Trip = require('../models/travlr');

// GET /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err);
        return res.status(500).json({ message: 'Error fetching trips', error: err });
    }
};

module.exports = {
    tripsList
};
