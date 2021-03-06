// import the express router
const router = require('express').Router();
// import the auth controller
const authCtrl = require('../controllers/auth');

// POST /auth/slack - receives a code and will exchange it for a access_token
router.post('/slack', authCtrl.exchangeCode);
// POST /auth/signup - creates a new user
router.post('/signup', authCtrl.createUser);
// POST /auth/login - retrives and validates the user
router.post('/login', authCtrl.getUser);

// export the route from this file
module.exports = router;
