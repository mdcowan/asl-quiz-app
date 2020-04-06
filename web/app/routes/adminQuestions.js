// import the express router
const router = require('express').Router();
// load the controller
const questionCrtl = require('../controllers/questions');
const validationCtrl = require('../controllers/validation');
// GET /admin/questions/new - loads the form to create a new decision
router.get('/new', questionCrtl.renderQuestionForm);
// POST /admin/questions/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createQuestions'),
  questionCrtl.renderQuestionFormWithErrors,
  questionCrtl.saveQuestion,
]);
// GET /admin/questions/edit/:id - loads the edit form
router.get('/edit/:id', questionCrtl.renderEditForm);
// POST /admin/questions/edit/:id - validate the data and than save it
router.post('/edit/:id', [
  validationCtrl.validate('editQuestions'),
  questionCrtl.renderQuestionFormWithErrors,
  questionCrtl.saveQuestion,
]);
// GET /admin/questions/delete/:id - deletes a question
router.get('/delete/:id', [
  validationCtrl.validate('deleteQuestion'),
  questionCrtl.goBackOnError,
  questionCrtl.deleteQuestion,
]);
// GET /admin/questions - loads all the user questions
router.get('/list', questionCrtl.renderDashboard);
// GET /admin/questions/:id - loads the detail page
router.get('/:id', questionCrtl.renderAdminQuestionDetail);
// export the route from this file
module.exports = router;
