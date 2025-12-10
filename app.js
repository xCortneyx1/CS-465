// app.js
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const cors = require('cors'); // enable CORS for Angular/admin

// Initialize MongoDB/Mongoose connection
require('./app_api/models/db');

// Routers
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const app = express();

// logging
app.use(morgan('dev'));

// body parsing (for JSON if needed later)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS (allow Angular admin SPA and other clients to call /api)
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine (Handlebars)
const hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
    helpers: {
        currency(value) {
            return `$${Number(value).toFixed(2)}`;
        },
        date(value) {
            return new Date(value).toLocaleDateString();
        },
        year() {
            return new Date().getFullYear();
        }
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// MVC routes for pages
app.use('/', travelRouter);        // home route
app.use('/travel', travelRouter);  // rubric: ensure /travel works

// API routes (JSON)
app.use('/api', apiRouter);

// 404
app.use((req, res) => res.status(404).send('Not Found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Travlr running on http://localhost:${PORT}`));
