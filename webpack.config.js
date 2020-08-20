var webpack = require("webpack");
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/BoilerplateComponent.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'BoilerplateComponent.js',
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
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'utils': path.resolve(__dirname, './utils')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'utils': 'utils'
    })
  ]
}