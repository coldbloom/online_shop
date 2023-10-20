const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const productImageController = require('../controllers/ProductImageController')

router.post('/', productController.crete)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', productController.delete)

router.post('/:id/uploadImage', productImageController.create)

module.exports = router