const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, articleAuthorization } = require('../middlewares/auth')

router.use('/', authentication)
router.post('/', ArticleController.create)
router.get('/search-tags', ArticleController.searchByTag)
router.get('/', ArticleController.find)
router.get('/:id', ArticleController.findOne)
router.patch('/:id', articleAuthorization, ArticleController.update)
router.delete('/:id', articleAuthorization, ArticleController.delete)

module.exports = router
