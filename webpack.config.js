const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const frontend = {
  entry: './src/js/main.js',
  target: 'web',
  output: {
    filename: '../dist/main.js',
    path: path.resolve(__dirname, 'src'),
    sourceMapFilename: '../dist/main.js.map',
    library: "MyApp",
    libraryTarget: "var"
  },
  module : {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from : 'src/index.html',
        to : '../dist/index.html'
      },
      {
        from : 'src/scss/font-awesome/fonts',
        to : '../dist/css/font-awesome/fonts'
      },
      {
        from : 'src/templates',
        to : '../dist/templates'
      },
      {
        from : 'assets/aws-config.js',
        to : '../dist/aws-config.js'
      },
    ])
  ],
  resolve: {
    alias: {
      Models: path.resolve(__dirname, './src/js/models/'),
      Modules: path.resolve(__dirname, './src/js/modules/'),
      Templates: path.resolve(__dirname, './src/templates/')
    }
  },
  devtool : "#source-map"
}


module.exports = [frontend];