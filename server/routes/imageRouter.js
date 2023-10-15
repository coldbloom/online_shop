const Router = require('express')
const router = new Router()
const productImageController = require('../controllers/productImageController')

router.post('/', productImageController.create)

module.exports = router