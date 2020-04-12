// load in the decision model
const { Quizzes } = require('../models');

// get all the quizzes
exports.getAll = async (req, res) => {
// filter the quizzes to only quizzes that were created by this user
  console.log(`API DEBUG: get all quizzes for user id: ${req.userId}`);
  const quizzes = await Quizzes.findAll({ where: { userId: req.userId } });
  // respond with json of the quizzes array
  res.json(quizzes);
};

// get all the quizzes with a type of public
exports.getPublic = async (req, res) => {
  // run the find all function on the model
  // filter the quizzes to only quizzes who have a type of "public"
  const publicQuizzes = await Quizzes.findAll({ where: { type: 'public' } });
  // respond with json of the public quizzes array
  res.json(publicQuizzes);
};

// find one quiz by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our quiz model for the decision
  const quiz = await Quizzes.findByPk(id);
  // if no quiz is found
  if (!quiz) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the quiz is found send it back.
  res.json(quiz);
};

// add a new quiz
exports.createQuiz = async (req, res) => {
  // get the title and type values from the request body
  const { name, type } = req.body;
  try {
    // create the item and save the new id
    const newDecision = await Quizzes.create({ name, type, userId: req.userId });
    // send the new id back to the request
    res.json({ id: newDecision.id });
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing quiz
exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedQuizzes]] = await Quizzes.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json(updatedQuizzes);
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a quiz
exports.removeQuiz = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the quiz
  await Quizzes.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
