// import the express router
const router = require('express').Router();
// import the choices controller
const choiceControl = require('../controllers/choices');
// GET /choices?questionId=
router.get('/', choiceControl.getQuestionChoices);
// GET /choices/:id
router.get('/:id', choiceControl.getOneById);
// POST /choices
router.post('/', choiceControl.createChoice);
// PUT /choices/:id
router.put('/:id', choiceControl.updateChoice);
// DELETE /choices/:id
router.delete('/:id', choiceControl.removeChoice);
// export the route from this file
module.exports = router;
