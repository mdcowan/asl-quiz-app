// load in the question model
const { Questions } = require('../models');
// get all the Questions that belong to one quiz
exports.getQuizQuestions = (req, res) => {
  // get the quiz id from the query
  const { quizId } = req.query;
  // run the find all function on the model
  const questions = Questions.findAll();
  // filter the questions to only questions for this quiz
  const quizQuestions = questions
    .filter((question) => question.quizId === quizId);
  // respond with json of the quiz's question array
  res.json(quizQuestions);
};

// find one question by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our question model for the question
  const question = Questions.findByPk(id);
  // if no question is found
  if (!question) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }
  // if the question is found send it back.
  res.json(question);
};

// add a new question
exports.createQuestion = (req, res) => {
  // get the title and type values from the request body
  const { title, quizId } = req.body;
  // create the item and save the new id
  const id = Questions.create({ title, quizId });
  // send the new id back to the request
  res.json({ id });
};

// update an existing question
exports.updateQuestion = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // update the question with any data from the req.body and the id
  const updatequestion = Questions.update(req.body, id);
  // respond with the updated question
  res.json(updatequestion);
};

// delete a question
exports.removeQuestion = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the question
  Questions.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
