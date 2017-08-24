export default {
  getCookie: (name) => {
    let cookiesArr;

    if (!document.cookie.length) {
      return;
    }

    cookiesArr = document.cookie.split(';');

    for (let i = 0, len = cookiesArr.length; i < len; i++) {
      let cookieObj = cookiesArr[i].split('=');

      if (cookieObj[0] === name) {
        return cookieObj[1];
      }
    }
  }
}
