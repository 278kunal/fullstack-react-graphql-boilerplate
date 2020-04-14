/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./webpack.common');

const config = {
  target: 'node',
  entry: './server/index.ts',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()]
};

module.exports = merge(config, commonConfig);
