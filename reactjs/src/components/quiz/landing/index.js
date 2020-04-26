import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.css';
import Link from '../../link';
import QuizzesContainer from '../../../containers/quizzes';
class Landing extends React.Component {
    componentDidMount() {
        const { fetchPublicQuizzes } = this.props;
        fetchPublicQuizzes();
    }
    
    render() {
        const { publicQuizzes } = this.props;
        return (
            <React.Fragment>
                <h1 className={styles.heading}>Welcome to Movie Trivia Quiz!</h1>
                <h2 className={styles.headingSecondary}>Are you a movie buff? Test your skills here!</h2>
                <p>Check out the quizzes created by others below for fun movie trivia challenges</p>
                <h2 className={styles.headingSecondary}>Want to test your friend's knowledge?</h2>
                <a href='/login' className={`${styles.button} primary`}>Create your own Quiz</a>
                <h1 className={styles.heading}>Public Quizzes</h1>
                <ul className={styles.list}>
                    {publicQuizzes.map(quiz => (
                    <li className={styles.list__item} key={quiz.id}>
                        <span className={styles.list__item__title}>{quiz.name}</span>
                        <Link url={`/admin/quizzes/${quiz.id}`}/>
                        <Link url={`/admin/quizzes/${quiz.id}`} title='Edit' icon='fa-edit' className='linkSecondary'/>
                    </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchPublicQuizzes: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  publicQuizzes: [],
};

export default QuizzesContainer(Landing);