const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const templates = require('./webpack.template')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [
    // new DefinePlugin({
    //   'process.env.API_ENDPOINT': '',
    // }),
  ].concat(templates),
})
