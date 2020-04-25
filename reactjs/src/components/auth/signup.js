import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';

class SignUp extends React.Component {
    state = {
        username: undefined,
        password: undefined,
    }

    handleInputChange = (event) => {
        // pull the name of the input and value of input out of the event object
        const { target: { name, value } } = event;
        // update the state to a key of the name of the input and value of the value of the input
        // ex: username: 'bill'
        this.setState({
          [name]: value,
        });
    }

    signup = (event) => {
        // don't actually submit the form through the browser
        event.preventDefault();
        const { createLogin, history } = this.props;
        const { username, password } = this.state;
        // if there is username and password, create the login
        if ({ username, password }){
            createLogin( username, password );
            history.push('/login')
        }
    }
      
    render() {
        const { username, password } = this.state;
        return (
        <>
            <h1>Sign Up</h1>
            <form method="POST" className={styles.form} onSubmit={this.save}>
            <label className={styles.form__label} htmlFor="username">
                <span>Username</span>
                <input
                type="text"
                name="username"
                username={username}
                id="username"
                className={styles.form__input}
                onChange={this.handleInputChange}
                />
            </label>
            <label className={styles.form__label} htmlFor="password">
                <span>Password</span>
                <input
                type="text"
                name="password"
                password={password}
                id="password"
                className={styles.form__input}
                onChange={this.handleInputChange}
                />
            </label>
            <button type="submit" onClick={this.signup} className={styles.button}>Submit</button>
            </form>
        </>
        );
    }
}

SignUp.propTypes = {
    createLogin: PropTypes.func.isRequired,
    history: RRPropTypes.location.isRequired,
}

SignUp.defaultProps = {
    loggedIn: false,
}; 

export default AuthContainer(SignUp);