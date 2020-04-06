// import the express router
const router = require('express').Router();
// load the controller
const questionCtrl = require('../controllers/questions');
const validationCtrl = require('../controllers/validation');
// GET /admin/questions/new - loads the form to create a new decision
router.get('/new', questionCtrl.renderQuestionForm);
// POST /admin/questions/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createQuestions'),
  questionCtrl.renderQuestionFormWithErrors,
  questionCtrl.saveQuestion,
]);
// GET /admin/questions/edit/:id - loads the edit form
router.get('/edit/:id', questionCtrl.renderEditForm);
// POST /admin/questions/edit/:id - validate the data and than save it
router.post('/edit/:id', [
  validationCtrl.validate('editQuestions'),
  questionCtrl.renderQuestionFormWithErrors,
  questionCtrl.saveQuestion,
]);
// GET /admin/questions/delete/:id - deletes a question
router.get('/delete/:id', [
  validationCtrl.validate('deleteQuestion'),
  questionCtrl.goBackOnError,
  questionCtrl.deleteQuestion,
]);

// GET /admin/questions/:id - loads the detail page
router.get('/:id', questionCtrl.renderAdminQuestionDetail);
// export the route from this file
module.exports = router;
