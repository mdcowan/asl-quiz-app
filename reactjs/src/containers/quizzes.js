import React from 'react';
import API from '../API';
export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    // the default state
    state = {
        quizzes: [],
        publicQuizzes: [],
    }

    // get this user's quizzes
    fetchUserQuizzes = async () => {
        // get the user quizzes from the api
        const quizzes = await API.get('/quizzes');
        // update the state
        this.setState({ quizzes });
    }  
    
    // get this public quizzes
    fetchPublicQuizzes = async () => {
      // get the public quizzes from the api
      const publicQuizzes = await API.get('/quizzes/public');
      // update the state
      this.setState({ publicQuizzes });
    }

    render() {
        const { quizzes, publicQuizzes } = this.state;
        return (
        <Component
            /* pass all other props that are being passed to this component forward */
            {...this.props}
            quizzes={quizzes}
            publicQuizzes={publicQuizzes}
            fetchUserQuizzes={this.fetchUserQuizzes}
            fetchPublicQuizzes={this.fetchPublicQuizzes}
        />
        );
    }
  };
}
