import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

import '../css/main.less';

function init() {
  render(<App />, document.getElementById('app'));
}

init();
