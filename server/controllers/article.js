const { article } = require('../models')

class ArticleController {
  static create(req, res, next) {
    const { title, content, tags, featured_image } = req.body
    article
      .create({
        title,
        content,
        tags,
        featured_image,
        owner: req.loggedUser._id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static find(req, res, next) {
    article
      .find()
      .sort({ createdAt: 'desc' })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({
            status: 404,
            message: 'No Data'
          })
        }
      })
      .catch(next)
  }
  static findMyArticles(req, res, next) {
    article
      .find({
        owner: req.loggedUser._id
      })
      .sort({ createdAt: 'desc' })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({
            status: 404,
            message: 'No Data'
          })
        }
      })
      .catch(next)
  }
  static findOne(req, res, next) {
    article
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({
            status: 404,
            message: 'Not found'
          })
        }
      })
      .catch(next)
  }
  static searchByTag(req, res, next) {
    article
      .find({
        tags: new RegExp(`${req.query.keyword}`, 'gi'),
        owner: req.loggedUser._id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { title, content, tags } = req.body
    article
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          title,
          content,
          tags
        }
      )
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    article
      .findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ArticleController
