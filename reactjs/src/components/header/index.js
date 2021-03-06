import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';
class Header extends React.Component {
    logUserOut = () => {
        const { logout, history } = this.props;
        logout();
        history.push('/');
    }
    render() {
    const { loggedIn } = this.props;
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link to='/' className={styles.header__brand}>Movie Trivia Quiz</Link>
                <div className={styles.links}>
                    {loggedIn && (
                        <React.Fragment>
                            <Link to='/admin/quizzes/' className={styles.header__link}>Dashboard</Link>
                            <Link to='/admin/quizzes/new' className={styles.header__link}>Create a new Quiz</Link>
                            <button type="button" onClick={this.logUserOut} className={styles.header__link}>Logout</button>
                        </React.Fragment>
                    )}
                    {!loggedIn && (
                        <Link to='login' className={styles.header__link}>Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    history: RRPropTypes.history.isRequired,
};
  
Header.defaultProps = {
loggedIn: false,
};

export default AuthContainer(Header);