// const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.conf.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

const webpackProdConfig = merge.smart(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    // new webpack.DefinePlugin({
    //   URLBASE: JSON.stringify('http://mcs.sooyue.com'),
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public', to: './' }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new UglifyEsPlugin({
      compress: {
        drop_console: true
      }
    }),
  ],
});

module.exports = webpackProdConfig;
