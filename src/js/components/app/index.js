import React from 'react';

// Components
import LoginPanel from '../login-panel';
import Main from '../main';

// Services
import { getCookie } from '../../services/cookies';
import constants from '../../services/constants';

// Styles
import './style.less';

export default class Layout extends React.Component {
  render() {
    constants.accessToken = getCookie('flyby_access_token');

    return (
      <div>
        { constants.accessToken ? (<Main />) : (<LoginPanel />) }
      </div>
    )
  }
}
