var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(styl|css)$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
         test: /\.(gif|png|jpg|svg)$/,
         loader: 'file-loader'
      },
      {
         test: /\.(eot|ttf|woff|woff2)$/,
         loader: 'url-loader'
      }
    ]
  }
};
