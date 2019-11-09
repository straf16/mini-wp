const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')
const { article } = require('../models')

module.exports = {
  authentication: function(req, res, next) {
    try {
      req.loggedUser = decodeToken(req.headers.token)
      User.findOne({
        _id: req.loggedUser._id
      })
        .then(result => {
          if (!result) {
            next({
              status: 401,
              message: 'Unauthorized'
            })
          } else {
            next()
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  },
  articleAuthorization: function(req, res, next) {
    article
      .findById(req.params.id)
      .then(result => {
        if (result && result.owner == req.loggedUser._id) {
          next()
        } else {
          next({
            status: 401,
            message: 'Not Authorized'
          })
        }
      })
      .catch(next)
  }
}
