exports.renderChoiceForm = (req, res) => {
  res.render('choices/form', { value: '', type: 'incorrect' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { value, type } = req.body;
  // send the value, type, and errors as variables to the view.
  res.render('choices/form', { value, type, errors });
};

exports.saveChoice = async (req, res) => {
  // get the data the user submitted
  const { value, type } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // variable to hold the data from our api request
  // eslint-disable-next-line no-unused-vars
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/choices/${id}`, { value, type });
  } else {
    // send the new question to the api
    data = await req.API.post('/choices', { value, type });
  }
  // redirect to the edit question form
  res.redirect(`/admin/choices/${id}`);
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the question
  const { value, type } = await req.API.get(`/choices/${id}`);
  // render the edit form
  res.render('choices/form', { value, type });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;
  // send the delete request to the api
  await req.API.delete(`/choices/${id}`);
  // redirect to the dashboard
  res.redirect('/admin/quizzes/list');
};
