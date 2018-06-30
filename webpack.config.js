const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
    sw: './src/sw.js'
  },
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].[hash].css",
          path: path.resolve(__dirname, 'build', 'css')
      }),
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        title: 'Currency Converter',
        template: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  }
};
