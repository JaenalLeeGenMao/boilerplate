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
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'goog': path.resolve(__dirname, './node_modules/shaka-player/third_party/closure/goog/base.js'), // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
      'deps': path.resolve(__dirname, './node_modules/shaka-player/dist/deps.js'),
      'asserts': path.resolve(__dirname, './node_modules/shaka-player/lib/debug/asserts.js'),
      'muxjs': path.resolve(__dirname, './node_modules/mux.js/dist/mux.min.js'),
      'eme': path.resolve(__dirname, './node_modules/eme-encryption-scheme-polyfill/index.js'),
      'shaka-debug': path.resolve(__dirname, './node_modules/shaka-player/dist/shaka-player.compiled.debug.js'),
      'shaka-prod': path.resolve(__dirname, './node_modules/shaka-player/dist/shaka-player.compiled.js'),
      'axios': path.resolve(__dirname, './node_modules/axios/dist/axios.min.js'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      goog: 'goog',
      deps: 'deps',
      asserts: 'asserts',
      muxjs: 'muxjs',
      eme: 'eme',
      shaka: 'shaka-prod', /** ganti shaka-debug untuk development */
      axios: 'axios',
    })
  ]
}