import React from 'react';
import API from '../API';
export default function container(Component) {
  return class QuizContainer extends React.Component {
    // the default state
    state = {
        quiz: {},
        questions: [],
    }

    fetchQuiz = async (id) => {
        // get the details of the quiz
        const quiz = await API.get(`/quizzes/${id}`);
        // get the questions for this quiz
        const questions = await API.get(`/questions?quizId=${id}`);
        this.setState({ quiz, questions });
    }

    saveQuiz = async (quiz) => {
      if (quiz.id) {
        return API.put(`/quizzes/${quiz.id}`, quiz);
      }
      return API.post('/quizzes', quiz);
    }

    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);
    }

    render() {
        const { quiz, questions } = this.state;
        return (
            <Component
            /* pass all other props that are being passed to this component forward */
            {...this.props}
            quiz = {quiz}
            questions = {questions}
            fetchQuiz = {this.fetchQuiz}
            saveQuiz = {this.saveQuiz}
            deleteQuiz={this.deleteQuiz}
            />
      );
    }
  };

}