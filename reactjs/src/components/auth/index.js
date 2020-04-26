import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import { Link as RRLink } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';


class Login extends React.Component {
    state = {
        username: undefined,
        password: undefined,
    }

    componentDidMount() {
        const { location, verifySlackCode } = this.props;
        // get the query params from the url query string
        const queryParams = new URLSearchParams(location.search);
        // get the code if there is one from slack
        const code = queryParams.get('code');
        // if there is code verify it
        if (code) verifySlackCode(code);
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

    login = (event) => {
        // don't actually submit the form through the browser
        event.preventDefault();
        const { sendLogin } = this.props;
        const { username, password } = this.state;
        // if there is username and password, verify it
        if ({ username, password }){
            sendLogin( username, password );
        }
    }
      
    redirectToSlack = () => {
        let SLACK_URL = 'https://slack.com/oauth/authorize?';
        SLACK_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
        SLACK_URL += '&scope=identity.basic,identity.email';
        SLACK_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
        window.location = SLACK_URL;
      }
    render() {
        const { loggedIn } = this.props;
        const { username, password } = this.state;
        if (loggedIn) return <Redirect to="/admin/quizzes" />;
        return (
        <>
            <h1>Login</h1>
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
                <button type="submit" onClick={this.login} className={`${styles.button} secondary`}>Login</button>
            </form>
            <button type="button" onClick={this.redirectToSlack} className={`${styles.button} active`}>
                    <i className="fab fa-slack" />
                    <span> Login with Slack</span>
            </button>
            <RRLink to={`/signup`} className={`${styles.button} active`}>Sign Up</RRLink>
        </>
        );
    }
}

Login.propTypes = {
    loggedIn: PropTypes.bool,
    sendLogin: PropTypes.func.isRequired,
    verifySlackCode: PropTypes.func.isRequired,
    location: RRPropTypes.location.isRequired,
}

Login.defaultProps = {
    loggedIn: false,
}; 

export default AuthContainer(Login);