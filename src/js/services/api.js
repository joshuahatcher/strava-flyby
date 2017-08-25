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

  getFriends: (mapResults) => {
    return api.get('https://www.strava.com/api/v3/athlete/friends').then(results => {
      if (mapResults) {
        return results.reduce((mappedResults, friend) => {
          mappedResults[friend.id] = friend;

          return mappedResults;
        }, {});
      } else {
        return results;
      }
    });
  },

  getActivities: (group = 'following') => {
    return api.get(`https://www.strava.com/api/v3/activities/${group}`, { per_page: 200 })
  }
}

export default api;
