/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styles from './styles/app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <main className={styles.main__container}>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
