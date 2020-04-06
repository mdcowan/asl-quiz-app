// import the express router
const router = require('express').Router();
// load the controller
const quizCtrl = require('../controllers/quizzes');
// GET /admin/decisions/new - loads the form to create a new decision
router.get('/new', quizCtrl.renderQuizForm);
// export the route from this file
module.exports = router;
