const { body } = require('express-validator')

module.exports.register = [
  body('username').isLength({ min: 5, max: 20 }),
  body('password').isLength({ min: 3, max: 20 }),
]

module.exports.login = [
  body('username').isLength({ min: 5, max: 20 }),
  body('password').isLength({ min: 3, max: 20 }),
]
