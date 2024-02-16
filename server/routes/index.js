const Router = require('express')
const router = new Router()

const adminAuthRouter = require('./adminAuthRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const imageRouter = require('./imageRouter')
const brandsRouter = require('./brandRouter')

router.use('/admin', adminAuthRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/image', imageRouter)
router.use('/brand', brandsRouter)

module.exports = router