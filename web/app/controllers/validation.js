const { check, validationResult } = require('express-validator');

const checks = {
  title: check('name')
    .exists().withMessage('Quiz name is required')
    .isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters'),
  type: check('type')
    .exists().withMessage('Quiz type is required')
    .isIn(['public', 'private'])
    .withMessage('Quiz must be public or private'),
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
    case 'createQuestions': {
      return [checks.name, checks.type, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
