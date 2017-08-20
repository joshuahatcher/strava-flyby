import $ from 'jquery';
import consts from './constants';

export default {
  get: (url, params = {}) => {
    const requestParams = Object.assign({}, params, { access_token: consts.accessToken });

    return $.ajax({
      url: url,
      type: 'GET',
      data: requestParams
    });
  }
}
