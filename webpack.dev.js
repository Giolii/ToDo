const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    // static: './dist',
    hot: true,
    watchFiles: ["src/*.html", "src/*.css","src/*.js"],
    // open:true,
    // compress:true,
    liveReload:false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
});
