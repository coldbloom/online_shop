const Router = require('express')
const router = new Router()
const productImageController = require('../controllers/productImageController')

router.delete('/:id', productImageController.delete)

module.exports = router