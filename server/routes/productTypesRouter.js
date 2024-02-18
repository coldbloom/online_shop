const Router = require('express')
const router = new Router()
const productTypesController = require('../controllers/productTypesControllers')
const {verifyAuthorizationMiddleware} = require('../auth/utils')

router.post('/', verifyAuthorizationMiddleware, productTypesController.create)
router.get('/', productTypesController.getAll)
router.delete('/:id', verifyAuthorizationMiddleware, productTypesController.delete)
router.put('/:id', verifyAuthorizationMiddleware, productTypesController.put)

module.exports = router