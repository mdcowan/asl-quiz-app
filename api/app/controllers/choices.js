// load in the choice model
const { Choices } = require('../models');
// get all the Choices that belong to one question
exports.getQuestionChoices = (req, res) => {
  // get the question id from the query
  const { questionId } = req.query;
  // run the find all function on the model
  const choices = Choices.findAll();
  // filter the choices to only choices for this question
  const questionChoices = choices
    .filter((choice) => choice.questionId === questionId);
  // respond with json of the question's choice array
  res.json(questionChoices);
};

// find one choice by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our choice model for the choice
  const choice = Choices.findByPk(id);
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
exports.createChoice = (req, res) => {
  // get the title and type values from the request body
  const { value, type, questionId } = req.body;
  // create the item and save the new id
  const id = Choices.create({ value, type, questionId });
  // send the new id back to the request
  res.json({ id });
};

// update an existing choice
exports.updateChoice = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // update the choice with any data from the req.body and the id
  const updateChoice = Choices.update(req.body, id);
  // respond with the updated choice
  res.json(updateChoice);
};

// delete a choice
exports.removeChoice = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the choice
  Choices.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
