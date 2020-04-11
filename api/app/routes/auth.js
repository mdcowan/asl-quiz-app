// import the express router
const router = require('express').Router();
// import the auth controller
const authCtrl = require('../controllers/auth');

// POST /auth/amazon - receives a code and will exchange it for a access_token
router.post('/amazon', authCtrl.exchangeCode);

// export the route from this file
module.exports = router;
