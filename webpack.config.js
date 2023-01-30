const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { resolve } = require('node:path');

const mode = process.env.NODE_ENV;

module.exports = {
  entry: { main: '.srcscriptsindex.js' },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    environment: {
      arrowFunction: false,
    },
    // assetModuleFilename: 'images/[name][ext]'
  },
  devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new MiniCssExtractPlugin(),
  ],
};
