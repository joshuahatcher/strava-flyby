const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const serverConfig = require('./serverConfig');

var lessRules = {
  fallback: 'style-loader',
  use: [ 'css-loader', 'less-loader' ]
};

const baseConfig = {
  devtool: 'source-map',
  entry: {
    main: path.join(__dirname, '/src/js/app.js')
  },
  output: {
    filename: 'js/app.bundle.js',
    path: path.join(__dirname, 'dist')
  },
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
        loader: ExtractTextPlugin.extract(lessRules)
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FlyBy',
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('css/main.css')
  ]
};

module.exports = baseConfig;
