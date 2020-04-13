const querystring = require('querystring');
const log = require('debug')('web:request');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.redirectToSlack = (req, res) => {
  // the base url
  const SLACK_URL = 'https://slack.com/oauth/authorize?';
  // convert the object into a query string (?client_id=&scope=&redirect_uri=)
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    // get the basic info about the user and their email
    scope: 'identity.basic,identity.email',
  });

  log(SLACK_URL + params);
  res.redirect(SLACK_URL + params);
};

exports.verifySlackCode = async (req, res) => {
  const { code } = req.query;
  // make an API request to verify the code
  const { token, loggedIn } = await req.API.post('/auth/slack', { code, url: process.env.CALLBACK_URL });
  // save the loggedIn state and token to the session
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  // go to the admin dashboard
  res.redirect('/admin/quizzes');
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderLoginFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { username, password } = req.body;
  // send the title, type, and errors as variables to the view.
  res.render('login', { username, password, errors });
};

exports.sendLogin = async (req, res) => {
  // get the data the user submitted
  const { username, password } = req.body;
  // make an API request to verify the login
  const { token, loggedIn } = await req.API.post('/auth/login', { username, password });

  if (loggedIn) {
    // save the loggedIn state and token to the session
    req.session.loggedIn = loggedIn;
    req.session.token = token;
    // go to the admin dashboard
    res.redirect('/admin/quizzes');
  } else {
    const errors = { error: { msg: 'Login incorrect' } };
    res.render('login', { username, password, errors });
  }
};

exports.renderSignup = (req, res) => {
  res.render('signup');
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderSignupFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { username, password } = req.body;
  console.log(username);
  // send the title, type, and errors as variables to the view.
  res.render('signup', { username, password, errors });
};

exports.createLogin = async (req, res) => {
  // get the data the user submitted
  const { username, password } = req.body;
  console.log('INFO: Login passed checks. Creating login');
  // variable to hold the data from our api request
  // eslint-disable-next-line no-unused-vars
  let data = {};
  // send the new quizzes to the api
  data = await req.API.post('/auth/signup', { username, password });
  if (data) {
    console.log('INFO: User created');
    // redirect to the quiz list
    res.redirect('/login');
  } else {
    const errors = [{ msg: 'unable to create login. please try again' }];
    // send the title, type, and errors as variables to the view.
    res.render('signup', { username, password, errors });
  }
};

exports.logout = (req, res) => {
  // destroy the user's session data (token and loggedIn)
  req.session.destroy();
  res.clearCookie();
  // send them to the home page
  res.redirect('/');
};
