// import the express router
const router = require('express').Router();
// load the controller
const quizCtrl = require('../controllers/quizzes');
const authCtrl = require('../controllers/auth');
// GET / - loads the home page
router.get('/', quizCtrl.renderLanding);
// GET /login - loads the login page
router.get('/login', authCtrl.renderLogin);
// GET /login/amazon - sends them to slack for authorization
router.get('/login/amazon', authCtrl.redirectToAmazon);
// GET /amazon/callback - the route that is hit when coming back from slack
router.get('/amazon/callback', authCtrl.verifyAmazonCode);
// GET /logout - log the user out of the application
router.get('/logout', authCtrl.logout);

// export the route from this file
module.exports = router;
