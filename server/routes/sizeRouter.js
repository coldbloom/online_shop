const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeControllers')
const {verifyAuthorizationMiddleware} = require('../auth/utils')

router.post('/', verifyAuthorizationMiddleware, sizeController.create)
router.get('/', verifyAuthorizationMiddleware, sizeController.getAll)
router.delete('/', verifyAuthorizationMiddleware, sizeController.delete)
router.put('/', verifyAuthorizationMiddleware, sizeController.put)

module.exports = router