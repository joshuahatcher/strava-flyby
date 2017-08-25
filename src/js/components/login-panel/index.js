import React from 'react';

// Compontents
import Header from '../header';

export default class LoginScreen extends React.Component {
  authenticateUser() {
    document.location = '/login';
  }

  render() {
    return (
      <div className="main-cover cover flex column center-children">
        <Header title="FlyBy - Please Log In" />
        <p>To use this application, you will need to have a Strava account. If you have one, click below to log in.</p>
        <button className="submit" onClick={this.authenticateUser}>Log In</button>
      </div>
    )
  }
}