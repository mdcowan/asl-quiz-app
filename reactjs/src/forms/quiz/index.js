import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../containers/quiz';

class QuizForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            type: undefined,
        };
    }  
    
    componentDidMount() {
        // get the id from the route params
        const { fetchQuiz, match: { params: { quizId } } } = this.props;
        fetchQuiz(quizId);
        console.log(this.props)
    }

    handleInputChange = (event) => {
        // pull the name of the input and value of input out of the event object
        const { target: { name, value } } = event;
        // update the state to a key of the name of the input and value of the value of the input
        // ex: type: 'private'
        this.setState({
          [name]: value,
        });
    }

    save = async (event) => {
        // don't actually submit the form through the browser
        event.preventDefault();
        const { quiz: { id }, saveQuiz, history } = this.props;
        const { name, type = 'public' } = this.state;
        const data = await saveQuiz({ id, name, type });
        console.log(data)
        history.push(`/admin/quizzes/${data.id}`);
    }
      
    render() {
        const {
            quiz: { id, name: defaultName = '', type: defaultType = 'public' },
        } = this.props;

        const { name = defaultName, type = defaultType } = this.state;

        let heading;
        if (id){
            heading = 'Edit Quiz';
        } else {
            heading = 'Create a New Quiz';
        }

        return (
            <React.Fragment>
                <h1 className={styles.heading}>{heading}</h1>
                <form method="POST" className={styles.form} onSubmit={this.save}>
                    <label className={styles.form__label} htmlFor="name">
                        <span>Quiz Name</span>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            className={styles.form__input} 
                            id="name"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label className={styles.form__label} htmlFor="public">
                        <span>Quiz Type</span>
                        <label className={styles.form__labelInline} htmlFor="public">
                            <input 
                                type="radio" 
                                name="type" 
                                value="public" 
                                checked={type==="public"} 
                                className={styles.form__input__radio}
                                id="public"
                                onChange={this.handleInputChange}
                            />
                            <span>Public</span>
                        </label>
                        <label className={styles.form__labelInline} htmlFor="privte">
                            <input 
                                type="radio" 
                                name="type" 
                                value="private" 
                                checked={type==="private"} 
                                className={styles.form__input__radio}
                                id="private"
                                onChange={this.handleInputChange}
                            />
                            <span>Private</span>
                        </label>
                    </label>
                    <button 
                        type="submit" 
                        className={`${styles.button} active`}
                    >
                        Save
                    </button>
                </form>
            </React.Fragment>
        );
    }
}
QuizForm.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
    }),
    saveQuiz: PropTypes.func.isRequired,
    fetchQuiz: PropTypes.func.isRequired,
    history: RRPropTypes.history.isRequired,
    match: RRPropTypes.match.isRequired,
};
QuizForm.defaultProps = {
    quiz: {},
};
export default QuizContainer(QuizForm);
