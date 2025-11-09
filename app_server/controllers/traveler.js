// app_server/controllers/traveler.js

// In a later module this data comes from MongoDB;
// For Module Two we render JSON-like objects via HBS.
const fs = require('fs');
const path = require('path');

// Helper function to load trips dynamically from JSON file
const getTrips = () => {
    try {
        const dataPath = path.join(__dirname, '../../trips.json');
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading trips.json:', err);
        return []; // return empty array if something fails
    }
};

// Home page controller
const home = (req, res) => {
    res.render('home', {
        title: 'Travlr Getaways',
        hero: {
            heading: 'Find your next escape.',
            sub: 'Search trips by destination and budget.'
        }
    });
};

// Travel list page controller (dynamic)
const travelList = (req, res) => {
    const trips = getTrips(); // read JSON file
    res.render('travel-list', {
        title: 'Trips',
        trips
    });
};

// Export controller functions
module.exports = {
    home,
    travelList
};

