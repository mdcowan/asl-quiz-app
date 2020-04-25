import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import Link from '../../components/link';
import QuestionContainer from '../../containers/question';
class QuestionForm extends React.Component {
  state = {
    title: undefined,
  }

  componentDidMount() {
    const { fetchQuestion, match: { params: { questionId } } } = this.props;
    if (questionId) fetchQuestion(questionId);
    console.log(this.props)
  }

  handleInputChange = (event) => {
    // pull the name of the input and title of input out of the even object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and title of the title of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      question: { id, quizId }, saveQuestion, history, location,
    } = this.props;
    console.log(this.props)

    const params = new URLSearchParams(location.search);
    const search = params.get('quizId');

    const { title } = this.state;

    if (search) {
      await saveQuestion({ id, search, title });
      history.push(`/admin/quizzes/${search}`);
    } else {
      await saveQuestion({ id, quizId, title });
      history.push(`/admin/quizzes/${quizId}`);
    }
  }

  delete = async () => {
    const { deleteQuestion, question: { id } } = this.props;
    await deleteQuestion(id);
  }

  render() {
    const {
      question: {
        id,
        // rename title prop to "defaultTitle"
        title: defaulttitle = '',
      },
      location,
    } = this.props;

    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);
    // get the quizId from query params
    const quizId = queryParams.get('quizId');
    const {
      // get the title from the state and if it doesn't exist use the prop
      title = defaulttitle,
    } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id && (
          <React.Fragment>
            <span>Edit Question</span>
            <span onClick={this.delete} role="presentation">
              <Link url={`/admin/quizzes/${quizId}`} title="Delete" icon="fa-trash" className="linkSecondary" />
            </span>
          </React.Fragment>
          )}

          {!id && (
          <span>New Question</span>
          )}

        </h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="title">
            <span>Title</span>
            <input
              type="text"
              name="title"
              value={title}
              id="title"
              className={styles.form__input}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </>
    );
  }
}

QuestionForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  saveQuestion: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  location: RRPropTypes.location.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionForm.defaultProps = {
  question: {},
};

export default QuestionContainer(QuestionForm);