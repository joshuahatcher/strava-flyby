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

  if (consts.accessToken && consts.accessToken !== 'undefined') {
    getSelf();
    getFriends(); // TODO - Need to wait for this request to return before we do anything

    loginContainer.classList.add('is-hidden');
    loggedInContainers.forEach(block => block.classList.remove('is-hidden'));
    getAthletesBtn.addEventListener('click', getRunningBuddies);
  } else {
    loginBtn.addEventListener('click', authenticateUser);
  }

  document.querySelectorAll('.loaded').forEach(block => block.classList.remove('is-hidden'));
  document.querySelectorAll('.loading').forEach(block => block.classList.add('is-hidden'));
}

function getFriends() {
  return api.get(`https://www.strava.com/api/v3/athlete/friends`, { per_page: 200 }).then(friends => {
    consts.friends = friends;
  });
}

function getRunningBuddies() {
  api.get('https://www.strava.com/api/v3/activities/following', { per_page: 200 })
    .then(activities => {
      const runs = activities.filter(activity => activity.type === 'Run');
      const activitiesMap = sortActivitiesByAthlete(runs);
      const paceMap = getAllPaces(activitiesMap);

      console.log(paceMap);
    });
}

function sortActivitiesByAthlete(activities) {
  return activities.reduce((activityGroups, activity) => {
    let athleteId = activity.athlete.firstname;
    if (activityGroups[athleteId]) {
      activityGroups[athleteId].push(activity);
    } else {
      activityGroups[athleteId] = [ activity ];
    }

    return activityGroups;
  }, {});
}

function getAllPaces(activityMap) {
  let paceMap = {};

  for (let athlete in activityMap) {
    let activities = activityMap[athlete];

    paceMap[athlete] = getAveragePace(activities);
  }

  return paceMap;
}

function getAveragePace(activities) {
  const paceParams = activities.reduce((totals, activity) => {
    totals.distance += activity.distance;
    totals.time += activity.moving_time;

    return totals;
  }, { distance: 0, time: 0 });

  return getPaceObject(paceParams);
}

function getPaceObject(params) {
  const pace = (params.time / 60) / (params.distance / 1609.34);

  return {
    pace,
    pace_legible: getLegiblePace(pace)
  };
}

function getLegiblePace(pace) {
  const minutes = Math.floor(pace);
  let seconds = Math.round(60 * (pace - minutes));

  seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}`;
}

function getSelf() {
  api.get('/self').then(response => {
    consts.self = response;
    api.get(`https://www.strava.com/api/v3/athletes/${response.id}/stats`).then(response => {
      consts.self.pace = getPaceObject(response.recent_run_totals);
    });


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
