const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const templates = require('./webpack.template')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    writeToDisk: true,
    historyApiFallback: false,
    watchContentBase: true,
    port: 8080,
  },
  plugins: [].concat(templates),
})
