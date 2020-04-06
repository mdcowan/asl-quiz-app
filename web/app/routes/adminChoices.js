// import the express router
const router = require('express').Router();
// load the controller
const choiceCtrl = require('../controllers/choices');
const validationCtrl = require('../controllers/validation');
// GET /admin/choices/new - loads the form to create a new choice
router.get('/new', choiceCtrl.renderChoiceForm);
// POST /admin/choices/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createChoices'),
  choiceCtrl.renderChoiceFormWithErrors,
  choiceCtrl.saveChoice,
]);
// GET /admin/choices/edit/:id - loads the edit form
router.get('/edit/:id', choiceCtrl.renderEditForm);
// POST /admin/choices/edit/:id - validate the data and than save it
router.post('/edit/:id', [
  validationCtrl.validate('editChoices'),
  choiceCtrl.renderChoiceFormWithErrors,
  choiceCtrl.saveChoice,
]);
// GET /admin/choices/delete/:id - deletes a Choices
router.get('/delete/:id', [
  validationCtrl.validate('deleteChoices'),
  choiceCtrl.goBackOnError,
  choiceCtrl.deleteChoice,
]);
