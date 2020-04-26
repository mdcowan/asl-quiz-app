import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import Link from '../../components/link';
import ChoiceContainer from '../../containers/choice';
class ChoiceForm extends React.Component {
  state = {
    value: undefined,
    type: undefined,
  }

  componentDidMount() {
    const { fetchChoice, match: { params: { choiceId } } } = this.props;
    if (choiceId) fetchChoice(choiceId);
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
      choice: { id, questionId }, saveChoice, history, location,
    } = this.props;
    console.log('Web request:')
    console.log(this.props)
    const { value, type } = this.state;
    console.log(value)
    console.log(type)
    console.log(id)

    const params = new URLSearchParams(location.search);
    const search = params.get('questionId');
    console.log(`Found search: ${search}`)    

    if (search) {
      await saveChoice({ questionId: search, value, type });
      history.push(`/admin/questions/${search}`);
    } else {
      await saveChoice({ id, questionId, value, type });
      history.push(`/admin/questions/${questionId}`);
    }
  }

  delete = async (event) => {
    event.preventDefault()
    const { deleteChoice, choice: { id } } = this.props;
    await deleteChoice(id);
  }

  render() {
    const {
      choice: { id, value: defaultValue = '', type: defaultType = 'incorrect' },
    } = this.props;

    const { value = defaultValue, type = defaultType } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id && (
          <React.Fragment>
            <span>Edit Choice</span>
            <span onClick={this.delete} role="presentation">
              <Link url={`/admin/quizzes`} title="Delete" icon="fa-trash" className="linkSecondary" />
            </span>
          </React.Fragment>
          )}

          {!id && (
          <span>New Choice</span>
          )}

        </h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="value">
            <span>Title</span>
            <input
              type="text"
              name="value"
              value={value}
              id="value"
              className={styles.form__input}
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label} htmlFor="incorrect">
            <span>Choice Type</span>
            <label className={styles.form__labelInline}>
                <input 
                    type="radio" 
                    name="type" 
                    value="incorrect" 
                    checked={type==="incorrect"} 
                    className={styles.form__input__radio}
                    id="incorrect"
                    onChange={this.handleInputChange}
                />
                <span>Incorrect</span>
            </label>
            <label className={styles.form__labelInline} htmlFor="correct">
                <input 
                    type="radio" 
                    name="type" 
                    value="correct" 
                    checked={type==="correct"} 
                    className={styles.form__input__radio}
                    id="correct"
                    onChange={this.handleInputChange}
                />
                <span>Correct</span>
            </label>
        </label>
          <button type="submit" className={`${styles.button} active`}>Save</button>
        </form>
      </>
    );
  }
}

ChoiceForm.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  }),
  saveChoice: PropTypes.func.isRequired,
  fetchChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  location: RRPropTypes.location.isRequired,
  match: RRPropTypes.match.isRequired,
};

ChoiceForm.defaultProps = {
  choice: {},
};

export default ChoiceContainer(ChoiceForm);