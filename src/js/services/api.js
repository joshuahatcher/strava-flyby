import 'whatwg-fetch';
import consts from './constants';

const api = {
  get: (url, params = {}) => {
    const requestParams = Object.assign({}, params, { access_token: consts.accessToken });

    url += ('?' + queryParams(requestParams));

    return fetch(url).then(results => results.json());
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

function queryParams(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default api;
