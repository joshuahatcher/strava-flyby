import $ from 'jquery';
import consts from './constants';

const api = {
  get: (url, params = {}) => {
    const requestParams = Object.assign({}, params, { access_token: consts.accessToken });

    return $.ajax({
      url: url,
      type: 'GET',
      data: requestParams
    });
  },

  getSelf: () => {
    return api.get('https://www.strava.com/api/v3/athlete');
  },

  getUser: (userId) => {
    return api.get(`https://www.strava.com/api/v3/athletes/${userId}/stats`);
  },

  getFriends: () => {
    return api.get('https://www.strava.com/api/v3/athlete/friends');
  },

  getActivities: (group = 'following') => {
    return api.get(`https://www.strava.com/api/v3/activities/${group}`, { per_page: 200 })
  }
}

export default api;
