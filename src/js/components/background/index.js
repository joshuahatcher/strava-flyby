import React from 'react';

// Components
import ProfilePhoto from '../profile/profile-photo';

// Styles
import './style.less';

const Background = (props) => {
  const listFriends = (friends) => {
    if (friends) {
      return Object.keys(friends).map((key, index) => {
        let imgUrl = friends[key].profile_medium
        // If profile photo is unset, API sends a broken link
        imgUrl = imgUrl === 'avatar/athlete/medium.png' ?
          'https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-63758b9942e3f074c3ecb84db07928ee.png' :
          imgUrl;
        return <ProfilePhoto key={index} imgUrl={imgUrl} />;
      });
    }
  }

  return (
    <div className="cover translucent flex flex-wrap center-children">
      {listFriends(props.friends)}
    </div>
  )
};

export default Background;
