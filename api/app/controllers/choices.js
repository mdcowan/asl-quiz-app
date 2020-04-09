// load in the choice model
const { Choices } = require('../models');
// get all the Choices that belong to one question
exports.getQuestionChoices = async (req, res) => {
  // get the question id from the query
  const { questionId } = req.query;
  // run the find all function on the model
  // filter the choices to only choices for this question
  const questionChoices = Choices.findAll({ where: { questionId } });
  // respond with json of the question's choice array
  res.json(questionChoices);
};

// find one choice by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our choice model for the choice
  const choice = await Choices.findByPk(id);
  // if no choice is found
  if (!choice) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }
  // if the choice is found send it back.
  res.json(choice);
};

// add a new choice
exports.createChoice = async (req, res) => {
  // get the title and type values from the request body
  const { value, type, questionId } = req.body;
  try {
    // create the item and save the new id
    const newChoice = await Choices.create({ value, type, questionId });
    // send the new id back to the request
    res.json({ id: newChoice.id });
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing choice
exports.updateChoice = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // update the choice with any data from the req.body and the id
    const [, [updatedChoice]] = await Choices.update(req.body, {
      where: { id },
      returning: true,
    });
    // respond with the updated choice
    res.json(updatedChoice);
  } catch (e) {
    // map the error messages and send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a choice
exports.removeChoice = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the choice
  await Choices.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
