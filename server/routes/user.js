const router = require('express').Router()
const { user } = require('../controllers')
const { googleVerify } = require('../middlewares/googleVerify')

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/googleSignIn', googleVerify, user.googleSignIn)

module.exports = router
