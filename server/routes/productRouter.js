const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const productImageController = require('../controllers/productImageController')

const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', productController.delete)

router.post('/:id/uploadImage', productImageController.create)

router.patch('/:id', productController.update)

router.post('/check', productController.checkName)


module.exports = router