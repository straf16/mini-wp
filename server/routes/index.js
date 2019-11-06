const router = require('express').Router()
const userRoute = require('./user')
const articleRoute = require('./article')

router.use('/users', userRoute)
router.use('/articles', articleRoute)

module.exports = router
