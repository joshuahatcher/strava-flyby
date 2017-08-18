import 'style-loader!../css/main.less';

import helpers from './helpers';
import api from './api';
import consts from './constants';

consts.accessToken = helpers.getCookie('flyby_access_token')

function init() {
  const loginContainer = document.querySelector('#loginContainer');
  const loginBtn = loginContainer.querySelector('#login');
  const mainContainer = document.querySelector('#mainContainer');
  const getAthletesBtn = mainContainer.querySelector('#getAthletes');

  if (consts.accessToken) {
    loginContainer.classList.add('is-hidden');
    mainContainer.classList.remove('is-hidden');
    getAthletesBtn.addEventListener('click', getAthletes);
  } else {
    loginBtn.addEventListener('click', authenticateUser);
  }
}

function authenticateUser() {
  document.location = 'https://www.strava.com/oauth/authorize' +
    '?client_id=18529' +
    '&response_type=code' +
    '&redirect_uri=http://localhost:8080/auth';
}

function getAthletes() {
  api.get('/athletes', 'GET').then(response => {
    const list = document.querySelector('#athletesList');

    if (response.errno) {
      throw Error(`${response.name}:`, response.message);
      return;
    }

    response.forEach(athlete => {
      const athleteImg = athlete.profile_medium === 'avatar/athlete/medium.png' ?
        'https://strava.com/assets/avatar/athlete/large-63758b9942e3f074c3ecb84db07928ee.png' :
        athlete.profile_medium;

      list.innerHTML += '<div class="profile flex column center-children">' +
        `<img src="${athleteImg}" />` +
        `<span>${athlete.firstname} ${athlete.lastname}</span><br>` +
        '</div>';
    })
  }, e => console.log(e));
}

init();
