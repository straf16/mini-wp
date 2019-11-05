module.exports = {
  errorHandler: function(err, req, res, next) {
    let status = err.status || 500
    let message = [err.message] || ['Internal Server Error']
    switch (err.name) {
      default:
        res.status(status).json(message)
        break
    }
  }
}
