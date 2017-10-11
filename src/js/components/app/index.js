import React from 'react';

// Components
import LoginPanel from '../login-panel';
import Main from '../main';

// Services
import { getCookie } from '../../services/cookies';
import constants from '../../services/constants';

// Styles
import './style.less';

const Layout = (props) => {
  constants.accessToken = getCookie('flyby_access_token');

  return (<div>{ constants.accessToken ? (<Main />) : (<LoginPanel />) }</div>)
}

export default Layout;
