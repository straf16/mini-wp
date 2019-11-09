const router = require('express').Router()
const { article } = require('../controllers')
const { authentication, articleAuthorization } = require('../middlewares/auth')
const { upload } = require('../middlewares/gcsUpload')

router.use('/', authentication)
router.post('/', upload.single('featured_image'), article.create)
router.get('/search-tags', article.searchByTag)
router.get('/my-articles', article.findMyArticles)
router.get('/', article.find)
router.get('/:id', article.findOne)
router.patch('/:id', articleAuthorization, article.update)
router.delete('/:id', articleAuthorization, article.delete)

module.exports = router
