import React from 'react';

// Components
import ProfilePhoto from './profile-photo';

const Profile = (props) => {
  return (
    <div className="profile flex center-children">
      <ProfilePhoto imgUrl={props.athlete.profile_medium} />
      <div className="block left-align">
        <p className="strong">{props.athlete.firstname} {props.athlete.lastname}</p>
        <p className="strong">Recent pace: {props.athlete.pace.pace_legible}</p>
      </div>
    </div>
  )
};

export default Profile;
