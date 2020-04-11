/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  entry: './client/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = merge(commonConfig, config);
