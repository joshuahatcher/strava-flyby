import $ from 'jquery';
import consts from './constants';

export default {
  get: (url) => {
    return $.ajax({
      url: url,
      type: 'GET',
      data: { access_token: consts.accessToken }
    });
  }
}
