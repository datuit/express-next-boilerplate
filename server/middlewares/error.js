const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  res.send({
    status,
    message,
    errors: err.errors,
  })
}

module.exports = errorMiddleware
