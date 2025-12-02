// app_server/controllers/traveler.js

// In Module 5, data comes from the REST API instead of a local JSON file.
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// Home page controller
const home = (req, res) => {
    res.render('home', {
        title: 'Travlr Getaways',
        hero: {
            heading: 'Travlr Getaways',
            sub: 'Your adventure starts here.'
        }
    });
};

// Travel list controller - now calls the API
const travelList = async (req, res) => {
    fetch(tripsEndpoint, options)
        .then(apiRes => {
            if (!apiRes.ok) {
                throw new Error(`API request failed with status ${apiRes.status}`);
            }
            return apiRes.json();
        })
        .then(json => {
            // console.log(json); // handy for debugging
            res.render('travel-list', {
                title: 'Trips',
                trips: json
            });
        })
        .catch(err => {
            console.error('Error fetching trips from API:', err);
            res.status(500).send(err.message);
        });
};

module.exports = {
    home,
    travelList
};
