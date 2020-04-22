/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './styles/app.module.css';
import Header from './components/header';
import Login from './components/login';
import QuizList from './components/quiz/list'
import Landing from './components/quiz/landing';
import QuizDetail from './components/quiz/detail';
import QuizForm from './forms/quiz';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path="/" component={Header} />
          <main className={styles.main__container}>
            <Route path="/" exact component={Landing} />
            <Route path="(/login|/slack/callback)" exact component={Login} />
            <Route path="/admin/quizzes" exact component={QuizList} />
            <Switch>
              <Route path="/admin/quizzes/new" exact component={QuizForm} />
              <Route path="/admin/quizzes/edit/:quizId" exact component={QuizForm} />
              <Route path="/admin/quizzes/:id" exact component={QuizDetail} />
            </Switch>
            
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
