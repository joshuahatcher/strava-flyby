import React from 'react';

// Components
import ProfilePhoto from '../profile/profile-photo';

// Styles
import './style.less';

export default class Background extends React.Component {
  listFriends(friends) {
    if (friends) {
      return friends.map(function(friend, index) {
        // If profile photo is unset, API sends a broken link
        let imgUrl = friend.profile_medium === 'avatar/athlete/medium.png' ?
          'https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-63758b9942e3f074c3ecb84db07928ee.png' :
          friend.profile_medium;
        return <ProfilePhoto key={index} imgUrl={imgUrl} />;
      });
    }
  }

  render() {
    return (
      <div className="cover translucent flex flex-wrap center-children">
        {this.listFriends(this.props.friends)}
      </div>
    )
  }
}
