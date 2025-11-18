const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

async function seed() {
    try {
        const data = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

        await Trip.deleteMany({});
        console.log('Existing trip records removed.');

        await Trip.insertMany(data);
        console.log('Seed data inserted successfully.');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
