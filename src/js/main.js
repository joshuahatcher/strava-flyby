import '../css/main.less';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

function init() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

init();
