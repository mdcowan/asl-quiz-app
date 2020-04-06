exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  // console.log(quizzes);
  res.render('landing', { quizzes });
};

exports.renderQuizForm = (req, res) => {
  res.render('quizzes/form', { name: '', type: 'private' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // send the title, type, and errors as variables to the view.
  res.render('quizzes/form', { name, type, errors });
};

exports.saveQuiz = async (req, res) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // variable to hold the data from our api request
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    // send the new quizs to the api
    data = await req.API.post('/quizzes', { name, type });
  }
  // redirect to the edit quiz form
  res.redirect(`/admin/quizzes/edit/${data.id}`);
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the quiz
  const quizzes = await req.API.get(`/quizzes/${id}`);
  // render the edit form
  res.render('quizzes/form', quizzes);
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  // send the delete request to the api
  await req.API.delete(`/quizzes/${id}`);
  // redirect to the dashboard
  res.redirect('/admin/quizzes');
};

exports.renderDashboard = async (req, res) => {
  const quizzes = await req.API.get('/quizzes');
  // console.log(quizzes)
  res.render('quizzes/list', { quizzes });
};

exports.renderAdminQuizDetail = async (req, res) => {
  const { id } = req.params;
  // console.log(`getting quiz detail ${req}`);
  // get the details of the quizzes
  const quizzes = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quizzes
  const questions = await req.API.get(`/options?quizId=${id}`);
  res.render('quizzes/detail', { quizzes, questions });
};
