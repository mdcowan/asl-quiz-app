exports.renderLanding = async (req, res) => {
  const questions = await req.API.get('/questions/public');
  res.render('landing', { questions });
};

exports.renderQuizForm = (req, res) => {
  res.render('questions/form', { name: '', type: 'private' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // send the title, type, and errors as variables to the view.
  res.render('questions/form', { name, type, errors });
};

exports.saveQuiz = async (req, res) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // variable to hold the data from our api request
  // eslint-disable-next-line no-unused-vars
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/questions/${id}`, { name, type });
  } else {
    // send the new quizs to the api
    data = await req.API.post('/questions', { name, type });
  }
  // redirect to the edit quiz form
  res.redirect('/admin/questions/list');
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the quiz
  const { name, type } = await req.API.get(`/questions/${id}`);
  // render the edit form
  res.render('questions/form', { name, type });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  // send the delete request to the api
  await req.API.delete(`/questions/${id}`);
  // redirect to the dashboard
  res.redirect('/admin/questions');
};

exports.renderAdminQuestionDetail = async (req, res) => {
  const { id } = req.params;
  // console.log(`getting quiz detail ${req}`);
  // get the details of the questions
  const question = await req.API.get(`/questions/${id}`);
  // get the choices for this questions
  const choices = await req.API.get(`/choices?questionId=${id}`);

  res.render('questions/detail', { question, choices });
};
