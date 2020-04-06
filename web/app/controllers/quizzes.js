exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};
