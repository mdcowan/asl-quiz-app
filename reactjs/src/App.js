/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styles from './styles/app.module.css';
import Header from './components/header';
import Login from './components/login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path="/" component={Header} />
          <main className={styles.main__container}>
            <Route path="(/login|/slack/callback)" exact component={Login} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
