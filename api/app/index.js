// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');

// routes
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const choicesRouter = require('./routes/choices');
const authRouter = require('./routes/auth');

// create an express app
const app = express();
// checks to see if the content-type is json and parses it into req.body
app.use(express.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));

// setup the app to use the routers defined
app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);
app.use('/choices', choicesRouter);
app.use('/auth', authRouter);

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
