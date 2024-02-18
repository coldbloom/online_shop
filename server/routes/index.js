const Router = require('express')
const router = new Router()

const adminAuthRouter = require('./adminAuthRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const imageRouter = require('./imageRouter')
const brandsRouter = require('./brandRouter')
const productTypeRouter = require('./productTypesRouter')
const sizeRouter = require('./sizeRouter')

router.use('/admin', adminAuthRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/image', imageRouter)
router.use('/brand', brandsRouter)
router.use('/productType', productTypeRouter)
router.use('/size', sizeRouter)

module.exports = router