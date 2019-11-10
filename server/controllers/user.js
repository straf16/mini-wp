const { user } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    user
      .create({
        name,
        email,
        password
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    user
      .findOne({
        email
      })
      .then(result => {
        if (result && comparePassword(password, result.password)) {
          const payload = {
            _id: result._id,
            name: result.name,
            email: result.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token,
            email: result.email,
            name: result.name
          })
        } else {
          next({
            status: 403,
            message: 'Invalid email/password'
          })
        }
      })
      .catch(next)
  }
  static googleSignIn(req, res, next) {
    user
      .findOne({
        email: req.decoded.email
      })
      .then(result => {
        if (result) {
          return result
        } else {
          return user.create({
            name: req.decoded.name,
            email: req.decoded.email,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then(result => {
        const payload = {
          _id: result._id,
          name: result.name,
          email: result.email
        }
        const token = generateToken(payload)
        res.status(200).json({
          token,
          email: result.email,
          name: result.name
        })
      })
      .catch(next)
  }
}

module.exports = UserController
