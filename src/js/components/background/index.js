import React from 'react';

// Components
import ProfilePhoto from '../profile/profile-photo';

// Styles
import './style.less';

const Background = (props) => {
  const listFriends = (friends) => {
    if (friends) {
      return Object.keys(friends)
        .map((key, index) => <ProfilePhoto key={index} imgUrl={friends[key].profile_medium} />);
    }
  }

  return (
    <div className="cover translucent flex flex-wrap center-children">
      {listFriends(props.friends)}
    </div>
  )
};

export default Background;
