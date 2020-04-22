import React from 'react';
import API from '../API';
export default function container(Component) {
  return class QuestionContainer extends React.Component {
    // the default state
    state= {
      question: {},
    }

    fetchQuestion = async (id) => {
      // get the id from the route params
      // get the details of the Question
      const question = await API.get(`/questions/${id}`);
      this.setState({ question });
    }

    saveQuestion = async (question) => {
      if (question.id) {
        return API.put(`/questions/${question.id}`, question);
      }

      return API.post('/questions', question);
    }

    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);
    }

    render() {
      const { question } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          question={question}
          fetchQuestion={this.fetchQuestion}
          saveQuestion={this.saveQuestion}
          deleteQuestion={this.deleteQuestion}
        />
      );
    }
  };

}
