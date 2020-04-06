// pull in the express package
const express = require('express');
// add a logger
const error = require('debug')('web:error');
// load in the axios middleware
const API = require('./utils/API');
// load routers
const publicRoutes = require('./routes/public');
const adminQuizRoutes = require('./routes/adminQuizzes');
// create an express app
const app = express();

// setup a folder to hold all the static files
app.use(express.static('public'));
// checks to see if the content-type is url-encoded and parses it into req.body
app.use(express.urlencoded({ extended: true }));
// axios middleware
app.use(API);
// setting pug as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);
// setup routers
app.use('/', publicRoutes);
app.use('/admin/decisions', adminQuizRoutes);
// four params are required to mark this as a error handling middleware
// the comment below this allows for eslint to not throw an error because
// I am not using the next function
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
