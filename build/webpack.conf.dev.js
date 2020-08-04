// const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.conf.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackDevConfig = merge.smart(webpackBaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   URLBASE: JSON.stringify('http://localhost:8086'),
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public', to: './' }
      ]
    })
  ],
  devServer: {
    contentBase: './docs',
    historyApiFallback: true,
    inline: true,
    port: 8086
  }
});

module.exports = webpackDevConfig;
