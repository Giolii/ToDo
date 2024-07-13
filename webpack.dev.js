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
    watchFiles: ["src/*.html"],
    // open:true,
    // compress:true,
    // liveReload:true,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
});
