module.exports = {
  PORT: process.env.PORT,
  SECRET: 'bezkoder-secret-key',
  HOST_DB: process.env.HOST_DB,
  PORT_DB: process.env.PORT_DB,
  NAME_DB: process.env.NAME_DB || '',
  USER_DB: process.env.USER_DB || '',
  PASSWORD_DB: process.env.PASSWORD_DB,
  jwtSecret: process.env.JWT_SECRET,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
