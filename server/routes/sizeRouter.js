const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeControllers')
const {verifyAuthorizationMiddleware} = require('../auth/utils')

router.post('/', verifyAuthorizationMiddleware, sizeController.create)
router.get('/', sizeController.getAll)
router.delete('/:id', verifyAuthorizationMiddleware, sizeController.delete)

module.exports = router