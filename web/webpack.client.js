/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  target: 'web',
  entry: './client/index.tsx',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = merge(config, commonConfig);
