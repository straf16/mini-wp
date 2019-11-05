const router = require('express').Router()
const userRoute = require('./user')

router.use('/users', userRoute)

module.exports = router
