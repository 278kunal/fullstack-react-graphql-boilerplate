/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const config = {
  entry: './client/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  ...(process.env.NODE_ENV === 'development' && {
    devtool: 'inline-source-map',
  }),
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

module.exports = config;
