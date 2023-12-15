const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const {verifyAuthorizationMiddleware} = require("../auth/utils");

router.post('/', verifyAuthorizationMiddleware, categoryController.create)
router.get('/', categoryController.getAll)
router.delete('/:id', verifyAuthorizationMiddleware, categoryController.delete)
router.put('/:id', verifyAuthorizationMiddleware, categoryController.edit)

module.exports = router