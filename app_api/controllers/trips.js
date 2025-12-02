// app_api/controllers/trips.js
const Trip = require('../models/travlr');

// GET /api/trips  -> return all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    return res
      .status(500)
      .json({ message: 'Error fetching trips', error: err });
  }
};

// GET /api/trips/:tripCode  -> get one trip by its code
const tripByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error fetching trip by code:', err);
    return res
      .status(500)
      .json({ message: 'Error fetching trip', error: err });
  }
};

// POST /api/trips  -> add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(trip);
  } catch (err) {
    console.error('Error adding trip:', err);
    return res
      .status(400)
      .json({ message: 'Error adding trip', error: err });
  }
};

// PUT /api/trips/:tripCode  -> update existing trip by code
const tripsUpdateTrip = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const trip = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        $set: {
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        }
      },
      { new: true } // return updated doc
    ).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error updating trip:', err);
    return res
      .status(400)
      .json({ message: 'Error updating trip', error: err });
  }
};

// DELETE /api/trips/:tripCode  -> delete by code
const tripsDeleteTrip = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const result = await Trip.findOneAndDelete({ code: tripCode }).exec();

    if (!result) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(204).json(null);
  } catch (err) {
    console.error('Error deleting trip:', err);
    return res
      .status(400)
      .json({ message: 'Error deleting trip', error: err });
  }
};

module.exports = {
  tripsList,
  tripByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
