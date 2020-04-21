import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import Link from '../../link';
import QuizzesContainer from '../../../containers/quizzes';
class QuizList extends React.Component {
    componentDidMount() {
        const { fetchUserQuizzes } = this.props;
        fetchUserQuizzes();
    }
    
    render() {
        const { quizzes } = this.props;
        return (
            <React.Fragment>
                <h1 className={styles.heading}>My Quizzes</h1>
                <ul className={styles.list}>
                    {quizzes.map(quiz => (
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

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.object),
  fetchUserQuizzes: PropTypes.func.isRequired,
};

QuizList.defaultProps = {
  quizzes: [],
};

export default QuizzesContainer(QuizList);