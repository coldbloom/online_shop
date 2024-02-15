const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandControllers')
const {verifyAuthorizationMiddleware} = require('../auth/utils')

router.post('/', verifyAuthorizationMiddleware, brandController.create)
router.get('/', brandController.getAll)
router.delete('/', verifyAuthorizationMiddleware, brandController.delete)

module.exports = router