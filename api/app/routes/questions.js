// import the express router
const router = require('express').Router();
// import the questions controller
const questionCtrl = require('../controllers/questions');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /questions?quizId=
router.get('/', questionCtrl.getQuizQuestions);
// GET /questions/:id
router.get('/:id', questionCtrl.getOneById);
// POST /questions
router.post('/', protectedRoute, questionCtrl.createQuestion);
// PUT /questions/:id
router.put('/:id', protectedRoute, questionCtrl.updateQuestion);
// DELETE /questions/:id
router.delete('/:id', protectedRoute, questionCtrl.removeQuestion);
// export the route from this file
module.exports = router;
