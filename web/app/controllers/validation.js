const { check, validationResult } = require('express-validator');

const checks = {
  id: check('id')
    .isUUID().withMessage('Id not valid, please go back try again'),
  name: check('name')
    .exists().withMessage('Quiz name is required')
    .isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters'),
  quizType: check('type')
    .exists().withMessage('Quiz type is required')
    .isIn(['public', 'private'])
    .withMessage('Quiz must be public or private'),
  title: check('title')
    .exists().withMessage('Question title is required')
    .isLength(3)
    .withMessage('Question title is required to be at least 3 characters'),
  value: check('value')
    .exists().withMessage('Choice value is required')
    .isLength(1)
    .withMessage('Choice value is required'),
  quizId: check('quizId')
    .isUUID().withMessage('Quiz Id not valid, please go back try again'),
  questionId: check('questionId')
    .isUUID().withMessage('Question Id not valid, please go back try again'),
  choiceType: check('type')
    .exists().withMessage('Choice type is required')
    .isIn(['correct', 'incorrect'])
    .withMessage('Choice type must be correct or incorrect'),
  username: check('username')
    .exists().withMessage('User name is required')
    .isLength(5)
    .withMessage('User name is required to be at least 5 characters'),
  password: check('password')
    .exists().withMessage('Password is required')
    .isLength(7)
    .withMessage('Password is required to be at least 7 characters'),
};

const checkForErrors = (req, res, next) => {
  // get any errors
  const errors = validationResult(req);
  // if there are errors go to the next error handler middleware with the errors from the validation
  if (!errors.isEmpty()) return next(errors.mapped());
  // if there are NO errors, go to the next normal middleware function
  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'createQuiz': {
      return [checks.name, checks.quizType, checkForErrors];
    }

    case 'editQuiz': {
      return [checks.id, checks.name, checks.quizType, checkForErrors];
    }

    case 'deleteQuiz': {
      return [checks.id, checkForErrors];
    }

    case 'createQuestions': {
      return [checks.title, checks.quizId, checkForErrors];
    }

    case 'editQuestion': {
      return [checks.id, checks.title, checks.quizId, checkForErrors];
    }

    case 'deleteQuestion': {
      return [checks.id, checkForErrors];
    }

    case 'createChoice': {
      return [checks.value, checks.choiceType, checks.questionId, checkForErrors];
    }

    case 'editChoice': {
      return [checks.id, checks.value, checks.choiceType, checks.questionId, checkForErrors];
    }

    case 'deleteChoice': {
      return [checks.id, checkForErrors];
    }

    case 'checkLogin': {
      return [checks.username, checks.password, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
