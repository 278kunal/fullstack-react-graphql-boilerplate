const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const config = {
  ...(process.env.NODE_ENV === "development" && {
    devtool: "inline-source-map",
  }),
  entry: "./client/index.tsx",
  mode: process.env.NODE_ENV,
  output: {
    filename: "client.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

module.exports = merge(commonConfig, config);
