// app_server/controllers/traveler.js

// In a later module this data comes from MongoDB;
// For Module Two we render JSON-like objects via HBS.
const sampleTrips = [
  {
    code: 'SE-BCN-7',
    name: 'Sunny Escape — Barcelona',
    length: 7,
    start: '2025-06-01',
    price: 1299.0,
    rating: 4.6,
    cover: '/images/trips/barcelona.jpg',
    summary: 'Tapas, beaches, Gaudí architecture, and a day trip to Montserrat.'
  },
  {
    code: 'AL-NYC-3',
    name: 'City Lights — New York',
    length: 3,
    start: '2025-09-15',
    price: 899.0,
    rating: 4.4,
    cover: '/images/trips/nyc.jpg',
    summary: 'Broadway, skyline views, and world-class museums in a compact getaway.'
  }
];

const home = (req, res) => {
  res.render('home', {
    title: 'Travlr Getaways',
    hero: {
      heading: 'Find your next escape.',
      sub: 'Search trips by destination and budget.'
    }
  });
};

const travelList = (req, res) => {
  res.render('travel-list', {
    title: 'Trips',
    trips: sampleTrips
  });
};

module.exports = {
  home,
  travelList
};
