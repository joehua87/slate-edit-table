/* eslint-disable no-var */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// PostCSS plugins
const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib-css'), // where to place webpack files
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path][local]__[hash:base64:5]!postcss-loader',
        }),
      },
    ],
  },
  postcss: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      // path.resolve(__dirname, 'node_modules'),
    ],
    modulesDirectories: ['src', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.react.js',
    ],
  },
}
