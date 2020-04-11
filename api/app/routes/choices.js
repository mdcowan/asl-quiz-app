// import the express router
const router = require('express').Router();
// import the choices controller
const choiceControl = require('../controllers/choices');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /choices?questionId=
router.get('/', choiceControl.getQuestionChoices);
// GET /choices/:id
router.get('/:id', choiceControl.getOneById);
// POST /choices
router.post('/', protectedRoute, choiceControl.createChoice);
// PUT /choices/:id
router.put('/:id', protectedRoute, choiceControl.updateChoice);
// DELETE /choices/:id
router.delete('/:id', protectedRoute, choiceControl.removeChoice);
// export the route from this file
module.exports = router;
