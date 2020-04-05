// import the express router
const router = require('express').Router();
// import the questions controller
const questionCtrl = require('../controllers/questions');
// GET /questions?quizId=
router.get('/', questionCtrl.getQuizQuestions);
// GET /questions/:id
router.get('/:id', questionCtrl.getOneById);
// POST /questions
router.post('/', questionCtrl.createQuestion);
// PUT /questions/:id
router.put('/:id', questionCtrl.updateQuestion);
// DELETE /questions/:id
router.delete('/:id', questionCtrl.removeQuestion);
// export the route from this file
module.exports = router;
