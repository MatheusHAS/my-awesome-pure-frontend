const { join, resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: ['./src/styles/main.scss', './src/javascript/main.js'],
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name]-bundle-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', 'scss'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        include: resolve(__dirname, 'src', 'views'),
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          minimize: false,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css',
    }),
  ],
}
