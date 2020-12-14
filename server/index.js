require('dotenv').config()
require('module-alias/register')
const express = require('express')
const next = require('next')

const createServer = require('./server')

const logger = require('./logger')

const { PORT } = require('@Constants/config')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  createServer(server)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, async (err) => {
    if (err) {
      return logger.error(err.message)
    }
    logger.appStarted(PORT, 'localhost')
  })
})
