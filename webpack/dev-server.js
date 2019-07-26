import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from './config-dev.babel'

export default (app) => {
  const webpackCompiler = webpack(webpackConfig)

  // use dev middleware
  app.use(webpackDevMiddleware(webpackCompiler, {
    // defines the level of messages to console.log()
    logLevel: 'warn',
    // public path to bind the middleware to
    publicPath: webpackConfig.output.publicPath
  }))
  // allow using Webpack hot loading
  app.use(webpackHotMiddleware(webpackCompiler))
}
