const express = require('express')
const validate = require('./validate')
const userController = require('@Controllers/userController')
const authController = require('@Controllers/authController')

const router = express.Router()

router.post('/register', validate.register, userController.register)
router.post('/login', validate.login, userController.login)
router.post('/get-user', authController.isAuthenticated, userController.getUser)

module.exports = router
