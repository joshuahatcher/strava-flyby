import React from 'react';

// Components
import ProfilePhoto from './profile-photo';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile flex center-children">
        <ProfilePhoto imgUrl={this.props.athlete.profile_medium} />
        <div className="block left-align">
          <p>{this.props.athlete.firstname} {this.props.athlete.lastname}</p>
          <p>Recent pace: {this.props.athlete.pace.pace_legible}</p>
        </div>
      </div>
    )
  }
}
