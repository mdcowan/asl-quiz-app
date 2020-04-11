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

exports.logout = (req, res) => {
  // destroy the user's session data (token and loggedIn)
  req.session.destroy();
  // send them to the home page
  res.redirect('/');
};
