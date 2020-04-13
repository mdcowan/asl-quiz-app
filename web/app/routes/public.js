// import the express router
const router = require('express').Router();
// load the controller
const quizCtrl = require('../controllers/quizzes');
const authCtrl = require('../controllers/auth');
const validationCtrl = require('../controllers/validation');
// GET / - loads the home page
router.get('/', quizCtrl.renderLanding);
// GET /login - loads the login page
router.get('/login', authCtrl.renderLogin);
// POST /login - logs the user in
router.post('/login', [
  validationCtrl.validate('checkLogin'),
  authCtrl.renderLoginFormWithErrors,
  authCtrl.sendLogin,
]);
// GET /login/slack - sends them to slack for authorization
router.get('/login/slack', authCtrl.redirectToSlack);
// GET /slack/callback - the route that is hit when coming back from slack
router.get('/slack/callback', authCtrl.verifySlackCode);
// GET /signup - log the user out of the application
router.get('/signup', authCtrl.renderSignup);
// POST /signup - create a new user
router.post('/signup', [
  validationCtrl.validate('checkLogin'),
  authCtrl.renderSignupFormWithErrors,
  authCtrl.createLogin,
]);


// GET /logout - log the user out of the application
router.get('/logout', authCtrl.logout);

// export the route from this file
module.exports = router;
