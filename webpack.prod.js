const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const templates = require('./webpack.template')

module.exports = merge(common, {
  mode: 'production',
  plugins: [].concat(templates),
})
