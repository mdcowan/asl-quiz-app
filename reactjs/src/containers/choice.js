import React from 'react';
import API from '../API';
export default function container(Component) {
  return class ChoiceContainer extends React.Component {
    // the default state
    state= {
      choice: {},
    }

    fetchchoice = async (id) => {
      // get the id from the route params
      // get the details of the choice
      const choice = await API.get(`/choices/${id}`);
      this.setState({ choice });
    }

    savechoice = async (choice) => {
      if (choice.id) {
        return API.put(`/choices/${choice.id}`, choice);
      }

      return API.post('/choices', choice);
    }

    deletechoice = async (id) => {
      await API.delete(`/choices/${id}`);
    }

    render() {
      const { choice } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          choice={choice}
          fetchChoice={this.fetchChoice}
          saveChoice={this.saveChoice}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };

}
