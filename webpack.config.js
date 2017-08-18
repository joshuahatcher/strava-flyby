const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const serverConfig = require('./serverConfig');

const baseConfig = {
  devtool: 'source-map',
  entry: {
    main: path.join(__dirname, '/src/js/app.js')
  },
  output: {
    filename: 'js/app.bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FlyBy',
      template: 'src/index.html',
      filename: 'index.html'
    })
  ],
  // devServer: serverConfig,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: { compact: false }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
};

module.exports = baseConfig;
