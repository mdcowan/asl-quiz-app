// import the express router
const router = require('express').Router();
// import the quiz controller
const quizCtrl = require('../controllers/quizzes');
// GET /quizzes route
router.get('/', quizCtrl.getAll);
// GET /quizzes/public
router.get('/public', quizCtrl.getPublic);
// GET /quizzes/:id
router.get('/:id', quizCtrl.getOneById);
// POST /quizzes
router.post('/', quizCtrl.createQuiz);
// PUT /quizzes/:id
router.put('/:id', quizCtrl.updateQuiz);
// DELETE /quizzes/:id
router.delete('/:id', quizCtrl.removeQuiz);
// export the route from this file
module.exports = router;
