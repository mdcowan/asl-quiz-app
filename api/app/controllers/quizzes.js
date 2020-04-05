// load in the decision model
const { Quizzes } = require('../models');

// get all the decisions
exports.getAll = (req, res) => {
  // run the find all function on the model
  const quizzes = Quizzes.findAll();
  // respond with json of the decisions array
  res.json(quizzes);
};

// get all the decisions with a type of public
exports.getPublic = (req, res) => {
  // run the find all function on the model
  const quizzes = Quizzes.findAll();
  // filter the decisions to only decisions who have a type of "public"
  const publicQuizzes = quizzes
    .filter((quiz) => quiz.type === 'public');
    // respond with json of the public decisions array
  res.json(publicQuizzes);
};

// find one decision by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our decision model for the decision
  const quiz = Quizzes.findByPk(id);
  // if no decision is found
  if (!quiz) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the decision is found send it back.
  res.json(quiz);
};

// add a new quiz
exports.createQuiz = (req, res) => {
  // get the title and type values from the request body
  const { name, type, userId } = req.body;
  console.log(req.body);
  // create the item and save the new id
  const id = Quizzes.create({ name, type, userId });
  // send the new id back to the request
  res.json({ id });
};

// update an existing quiz
exports.updateQuiz = (req, res) => {
  const { id } = req.params;
  const updatedQuizzes = Quizzes.update(req.body, id);
  res.json(updatedQuizzes);
};

// delete a quiz
exports.removeQuiz = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the quiz
  Quizzes.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
