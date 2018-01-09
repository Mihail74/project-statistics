var utils = require('./utils')
var buildConfig = require('./config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? buildConfig.build.productionSourceMap
      : buildConfig.dev.cssSourceMap,
    extract: isProduction
  })
}
