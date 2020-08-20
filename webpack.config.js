var webpack = require("webpack");
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/mola-player.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'mola-player.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}