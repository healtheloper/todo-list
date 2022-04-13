const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webpack } = require("webpack");

module.exports = (env) => {
  const { DEPLOY } = env;
  return {
    mode: "development",
    entry: ["./src/index.js"],
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    plugins: [
      new ErrorOverlayPlugin(),
      new ESLintPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin({
        DEPLOY,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
  };
};
