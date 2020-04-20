import React from 'react';
import API from '../API';
export default function container(Component) {
  class AuthContainer extends React.Component {
    state = {
      loggedIn: false,
    }

    verifySlackCode = async (code) => {
      // eslint-disable-next-line no-unused-vars
      const { token, loggedIn } = await API.post('/auth/slack', { code, url: process.env.REACT_APP_CALLBACK_URL });
    }

    render() {
      const { loggedIn } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          loggedIn={loggedIn}
          verifySlackCode={this.verifySlackCode}
        />
      );
    }
  }
  return AuthContainer;
}
