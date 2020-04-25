import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import Link from '../../link';
import { ChoiceContainer } from '../../containers';
class ChoiceForm extends React.Component {
  state = {
    value: undefined,
    type: undefined
  }

  componentDidMount() {
    const { fetchchoice, match: { params: { id } } } = this.props;
    console.log(this.props);
    if (id) fetchchoice(id);
  }

  handleInputChange = (event) => {
    // pull the name of the input and title of input out of the even object
    const { target: { name, title } } = event;
    // update the state to a key of the name of the input and title of the title of the input
    // ex: type: 'private'
    this.setState({
      [name]: title,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      choice: { id }, saveChoice, history, location,
    } = this.props;

    const { title } = this.state;
    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);
    // get the choiceId from query params
    const choiceId = queryParams.get('choiceId');
    await saveChoice({ id, choiceId, title });
    history.push(`/admin/choices/${choiceId}`);
  }

  delete = async () => {
    const { deleteChoice, choice: { id } } = this.props;
    await deleteChoice(id);
  }

  render() {
    const {
      choice: {
        id,
        title: defaultvalue = '',
        type: defaultType = 'incorrect',
      },
      location,
    } = this.props;

    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);
    // get the choiceId from query params
    const choiceId = queryParams.get('choiceId');
    const {
      // get the valye and type from the state and if it doesn't exist use the prop
      value = defaultvalue,
      type = defaultType,
    } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id && (
          <React.Fragment>
            <span>Edit Choice</span>
            <span onClick={this.delete} role="presentation">
              <Link url={`/admin/choices/${choiceId}`} title="Delete" icon="fa-trash" className="linkSecondary" />
            </span>
          </React.Fragment>
          )}

          {!id && (
          <span>New Choice</span>
          )}

        </h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="value">
            <span>Value</span>
            <input
              type="text"
              name="value"
              value={value}
              id="value"
              className={styles.form__input}
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label}>
            <span>Quiz Type</span>
            <label className={styles.form__labelInline} htmlFor="incorrect">
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
          <button type="submit" className={styles.button}>Save</button>
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