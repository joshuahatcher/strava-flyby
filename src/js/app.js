import '../css/main.less';

import helpers from './helpers';
import api from './api';
import consts from './constants';

consts.accessToken = helpers.getCookie('flyby_access_token')

function init() {
  const loginContainer = document.querySelector('#loginContainer');
  const loginBtn = loginContainer.querySelector('#login');
  const loggedInContainers = document.querySelectorAll('.logged-in');
  const getAthletesBtn = mainContainer.querySelector('#getAthletes');

  if (consts.accessToken) {
    getCurrentUser();

    loginContainer.classList.add('is-hidden');
    loggedInContainers.forEach(block => block.classList.remove('is-hidden'));
    getAthletesBtn.addEventListener('click', getAthletes);
  } else {
    loginBtn.addEventListener('click', authenticateUser);
  }

  document.querySelectorAll('.loaded').forEach(block => block.classList.remove('is-hidden'));
  document.querySelectorAll('.loading').forEach(block => block.classList.add('is-hidden'));
}

function getCurrentUser() {
  api.get('/self').then(response => {
    consts.self = response;

    document.querySelector('#selfName').innerHTML = response.firstname;
    document.querySelector('#selfImg').setAttribute('src', response.profile_medium);
  });
}

function authenticateUser() {
  document.location = 'https://www.strava.com/oauth/authorize' +
    '?client_id=18529' +
    '&response_type=code' +
    '&redirect_uri=http://localhost:8080/auth';
}

function getAthletes() {
  api.get('/athletes').then(response => {
    const list = document.querySelector('#athletesList');

    if (response.errno) {
      throw Error(`${response.name}:`, response.message);
      return;
    }

    response.forEach(athlete => {
      const athleteImg = athlete.profile_medium === 'avatar/athlete/medium.png' ?
        'https://strava.com/assets/avatar/athlete/large-63758b9942e3f074c3ecb84db07928ee.png' :
        athlete.profile_medium;

      list.innerHTML += '<div class="profile squared flex column center-children">' +
        `<img class="with-margin--less" src="${athleteImg}" />` +
        `<span class="block">${athlete.firstname} ${athlete.lastname}</span><br>` +
        '</div>';
    })
  }, e => console.log(e));
}

init();
