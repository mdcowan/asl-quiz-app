// load in the question model
const { Questions } = require('../models');
// get all the Questions that belong to one quiz
exports.getQuizQuestions = async (req, res) => {
  // get the quiz id from the query
  const { quizId } = req.query;
  // run the find all function on the model
  // filter the questions to only questions for this quiz
  const quizQuestions = await Questions.findAll({ where: { quizId } });
  // respond with json of the quiz's question array
  res.json(quizQuestions);
};

// find one question by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our question model for the question
  const question = await Questions.findByPk(id);
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
exports.createQuestion = async (req, res) => {
  // get the title and type values from the request body
  const { title, quizId } = req.body;
  try {
    // create the item and save the new id
    console.log(`quizId: ${quizId}`);
    const newQuestion = Questions.create({ title, quizId });
    // send the new id back to the request
    res.json({ id: newQuestion.id });
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing question
exports.updateQuestion = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // update the question with any data from the req.body and the id
    const [, [updatequestion]] = await Questions.update(req.body, {
      where: { id },
      returning: true,
    });
    // respond with the updated question
    res.json(updatequestion);
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a question
exports.removeQuestion = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the question
  await Questions.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
