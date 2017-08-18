const path = require('path');

module.exports = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  proxy: {
    '/api': 'http://localhost:8080',
    '/auth': 'http://localhost:8080/'
  }
}
