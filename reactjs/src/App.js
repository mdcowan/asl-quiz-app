/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './styles/app.module.css';
import Header from './components/header';
import Login from './components/auth';
import SignUp from './components/auth/signup';
import QuizList from './components/quiz/list'
import Landing from './components/quiz/landing';
import QuizDetail from './components/quiz/detail';
import QuizForm from './forms/quiz';
import QuestionDetail from './components/question/detail';
import QuestionForm from './forms/question';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path="/" component={Header} />
          <main className={styles.main__container}>
            <Route path="/" exact component={Landing} />
            <Route path="(/login|/slack/callback)" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/admin/quizzes" exact component={QuizList} />
            <Switch>
              <Route path="/admin/quizzes/new" exact component={QuizForm} />
              <Route path="/admin/quizzes/edit/:quizId" exact component={QuizForm} />
              <Route path="/admin/quizzes/:quizId" exact component={QuizDetail} />
              <Route path="/admin/questions/new" exact component={QuestionForm} />
              <Route path="/admin/questions/edit/:questionId" exact component={QuestionForm} />
              <Route path="/admin/questions/:questionId" exact component={QuestionDetail} />
            </Switch>
            
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
