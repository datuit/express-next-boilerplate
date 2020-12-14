const jwt = require('jsonwebtoken')

module.exports.isAuthenticated = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    var jwtToken = req.headers.authorization.split(' ')[1]
    jwt.verify(jwtToken, config.jwtSecret, async function (err, payload) {
      if (err) {
        res.status(401).json({ message: 'Unauthorized user!' })
      } else {
        console.log('decoder: ' + payload.username)
        // find user
        const user = await prisma.users.findFirst({
          where: {
            username: payload.username,
          },
        })
        if (user) {
          req.users = user
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized user!' })
        }
      }
    })
  } else {
    res.status(401).json({ message: 'Unauthorized user!' })
  }
}
