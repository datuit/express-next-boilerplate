const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const swaggerDocV1 = require('@Api/v1/swagger.json')
const apiRouter = require('@Api')
const errorMiddleware = require('@Middlewares/error')

module.exports = (server) => {
  server.use(cors())
  server.use(express.urlencoded({ extended: true }))
  server.use(express.json())
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocV1))
  server.use('/api', apiRouter)

  //handing error
  server.use(errorMiddleware)
}
