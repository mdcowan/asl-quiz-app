// import the express router
const router = require('express').Router();
// load the controller
const quizCtrl = require('../controllers/quizzes');
// GET / - loads the home page
router.get('/', quizCtrl.renderLanding);
// GET /quiz/:quizId
// router.get('/quiz/:quizId', quizCtrl.renderQuiz);

// export the route from this file
module.exports = router;
