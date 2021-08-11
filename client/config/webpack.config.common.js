const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv-webpack");
const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "bundle.js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "../src/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|ico)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new dotenv({
        path: env.production ? "./env/.env" : "./env/dev.env",
      }),
      new forkTsCheckerWebpackPlugin(),
    ],
  };
};
