const Article = require('../models/article')

class ArticleController {
  static create(req, res, next) {
    const { title, desc, tags } = req.body
    Article.create({
      title,
      desc,
      tags,
      owner: req.loggedUser._id
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static find(req, res, next) {
    Article.find()
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
    Article.findOne({
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
    Article.find({
      tags: new RegExp(`${req.query.keyword}`, 'gi')
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { title, desc, tags } = req.body
    Article.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        title,
        desc,
        tags
      }
    )
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ArticleController
