import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link as RRLink } from 'react-router-dom';
import Link from '../../link';
import styles from '../../styles.module.css';
import QuestionContainer from '../../../containers/question';

class QuestionDetail extends React.Component {
    componentDidMount() {
        // get the id from the route params
        const { fetchQuestion, match: { params: { questionId } } } = this.props;
        console.log(this.props)
        fetchQuestion(questionId);
        console.log(this.state)
    }   
    
    delete = async () => {
        const { deleteQuestion, question: { id } } = this.props;
        await deleteQuestion(id);
    }
      
    render() {
        const { question, choices } = this.props;
        return(
            <React.Fragment>
                <h1 className={styles.heading}>{question.name}
                    <Link url={`/admin/questions/${question.id}`}/>
                    <Link url={`/admin/questions/edit/${question.id}`} title='Edit' iconn='fa-edit'/>
                    <span onClick={this.delete} role="presentation">
                        <Link url={`/admin/questions/delete/${question.id}`} title='Delete' icon='fa-trash' className='linkSecondary'/>
                    </span>
                </h1>
                <h2 className={styles.headingSecondary}>Choices</h2>
                <ul className={styles.list}></ul>
                    {choices.map(choice => (
                        <li className={styles.list__item}>
                            <span className={styles.list__item__title}>{choice.title}</span>
                            <Link url={`/admin/choices/${choice.id}`}/>
                            <Link url={`/admin/choices/delete/${choice.id}`} title='Delete' icon='fa-trash' className='linkSecondary'/>
                        </li>
                    ))}
                <RRLink to={`/admin/questions/new?questionId=${question.id}`} className='button active'>Add a new question</RRLink>
            </React.Fragment>
        );
    }
}

QuestionDetail.propTypes = {
  question: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }),
  choices: PropTypes.arrayOf(PropTypes.object),
  fetchQuestion: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

QuestionDetail.defaultProps = {
  question: {},
  choices: [],
};

export default QuestionContainer(QuestionDetail);