// import the express router
const router = require('express').Router();
// import the quiz controller
const quizCtrl = require('../controllers/quizzes');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /quizzes route
router.get('/', protectedRoute, quizCtrl.getAll);
// GET /quizzes/public
router.get('/public', quizCtrl.getPublic);
// GET /quizzes/:id
router.get('/:id', quizCtrl.getOneById);
// POST /quizzes
router.post('/', protectedRoute, quizCtrl.createQuiz);
// PUT /quizzes/:id
router.put('/:id', protectedRoute, quizCtrl.updateQuiz);
// DELETE /quizzes/:id
router.delete('/:id', protectedRoute, quizCtrl.removeQuiz);
// export the route from this file
module.exports = router;
