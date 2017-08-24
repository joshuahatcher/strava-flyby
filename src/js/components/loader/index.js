import React from 'react';

// Styles
import './style.less';

import loaderImg from '../../../img/loader.gif';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader main-cover cover in-front flex center-children">
        <img src={loaderImg} />
      </div>
    )
  }
}