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
    main: path.join(__dirname, '/src/js/main.js')
  },
  output: {
    filename: 'js/main.bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  // devServer: serverConfig,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              compact: false,
              presets: [ 'react', 'es2015' ],
              plugins: [
                'react-html-attrs',
                'transform-decorators-legacy',
                'transform-class-properties'
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(lessRules)
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader?limit=100000&name=./img/[hash].[ext]'
          }
        ]
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
