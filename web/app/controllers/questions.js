exports.renderQuestionForm = (req, res) => {
  res.render('questions/form', { title: '' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { title } = req.body;
  // send the title, type, and errors as variables to the view.
  res.render('questions/form', { title, errors });
};

exports.saveQuestion = async (req, res) => {
  // get the data the user submitted
  const { title } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // variable to hold the data from our api request
  // eslint-disable-next-line no-unused-vars
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/questions/${id}`, { title });
  } else {
    // send the new question to the api
    data = await req.API.post('/questions', { title });
  }
  // redirect to the edit question form
  res.redirect(`/admin/questions/${id}`);
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the question
  const { title } = await req.API.get(`/questions/${id}`);
  // render the edit form
  res.render('questions/form', { title });
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
  res.redirect('/admin/quizzes/list');
};

exports.renderAdminQuestionDetail = async (req, res) => {
  const { id } = req.params;
  // get the details of the questions
  const question = await req.API.get(`/questions/${id}`);
  // get the choices for this questions
  const choices = await req.API.get(`/choices?questionId=${id}`);

  res.render('questions/detail', { question, choices });
};
