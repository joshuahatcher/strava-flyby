import React from 'react';

// Components
import LoginPanel from '../login-panel';
import Main from '../main';

// Services
import cookies from '../../services/cookies';

// Styles
import './style.less';

export default class Layout extends React.Component {
  render() {
    const accessToken = cookies.getCookie('flyby_access_token');

    return (
      <div>
        { accessToken ? (<Main />) : (<LoginPanel />) }
      </div>
    )
  }
}
