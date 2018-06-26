const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
          filename: "styles.css",
          path: path.resolve(__dirname, 'build', 'css')
      })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build'
  }
};
