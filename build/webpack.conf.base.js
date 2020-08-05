const path = require('path');

const webpackBaseConfig = {
  context: path.resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'render.js',
    libraryTarget: 'var',
    library: 'RayTracing',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs']
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {loader: 'worker-loader'},
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
      },
      {
        test: /\.worker\.ts$/,
        use: [
          {loader: 'worker-loader'},
          {loader: 'ts-loader',}
        ],
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
};

module.exports = webpackBaseConfig;
