const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const prisma = require('@Services/prisma')

const HttpException = require('@Helpers/HttpException')
const ResData = require('@Helpers/ResData')
const config = require('@Constants/config')
const message = require('@Constants/message')

module.exports.register = async (req, res, next) => {
  try {
    //Check error validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, '', errors.array())
    }
    const { username, password } = req.body
    //Check user exist
    const isExistUser = await prisma.users.findFirst({
      where: {
        username,
      },
    })
    if (isExistUser) {
      throw new HttpException(403, message.IS_EXIST_USER)
    }
    // create user
    const user = await prisma.users.create({
      data: {
        username,
        password: bcrypt.hashSync(password, 10),
      },
    })
    res.send(new ResData(200, message.SUCCESS, user))
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    //Check error validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, '', errors.array())
    }
    const { username, password } = req.body
    const isExistUser = await prisma.users.findFirst({
      where: {
        username,
      },
    })
    //Check user exist
    if (isExistUser && bcrypt.compareSync(password, isExistUser.password)) {
      const payload = { id: isExistUser.id, username: isExistUser.username }
      const jwtToken = jwt.sign(payload, config.jwtSecret, {
        expiresIn: 1 * 30,
      })
      console.log('jwtToken: ' + jwtToken)
      const jsonResponse = {
        access_token: jwtToken,
        refresh_token: 'xxxxx-xxx-xx-x',
      }
      res.json(jsonResponse)
    } else {
      throw new HttpException(401, message.LOGIN)
    }
  } catch (error) {
    next(error)
  }
}

module.exports.getUser = async (req, res) => {
  // find
  const user = await prisma.users.findFirst({
    where: {
      username: req.users.username,
    },
  })

  if (user) {
    const jsonResponse = { user: user }
    res.json(jsonResponse)
  } else {
    res.send(
      JSON.stringify({
        error: 'Login Error',
      }),
    )
  }
}
