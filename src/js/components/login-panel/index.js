import React, { Component } from 'react';

// Compontents
import Header from '../header';

export default class LoginPanel extends Component {
  authenticateUser() {
    document.location = '/login';
  }

  render() {
    return (
      <div className="main-cover cover flex column center-children with-padding">
        <Header title="FlyBy - Please Log In" />
        <p>To use this application, you will need to have a Strava account. If you have one, click below to log in.</p>
        <button className="submit" onClick={this.authenticateUser}>Log In</button>
      </div>
    )
  }
}