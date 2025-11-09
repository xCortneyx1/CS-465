// app.js
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const travelRouter = require('./app_server/routes/travel');

const app = express();

// logging
app.use(morgan('dev'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars view engine
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

// routes
app.use('/', travelRouter);        // home route
app.use('/travel', travelRouter);  // rubric: ensure /travel works

// 404
app.use((req, res) => res.status(404).send('Not Found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Travlr running on http://localhost:${PORT}`));
