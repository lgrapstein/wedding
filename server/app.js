import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import webpackDevServer from '../client/webpack/dev-server'
import routes from './routes'

// use dotenv
dotenv.config({ silent: true })

// Express app setup
const app = express()

// views engine
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app)
}

// logger
app.use(logger('combined'))

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cookie parser
app.use(cookieParser())

// serve static files from 'public'
app.use(express.static(path.join(__dirname, '../client/public')))

// use routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    // hides the stack trace for users on production
    // shows the stack trace only when developing and writing code
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  })
  next()
})

export default app
