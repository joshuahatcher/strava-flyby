import React from 'react';

// Styles
import './style.less';

export default class ProfilePhoto extends React.Component {
  render() {
    return (
      <div className="profile-photo squared flex column center-children">
        <img className="with-margin--less" src={this.props.imgUrl} />
      </div>
    )
  }
}
