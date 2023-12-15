const Router = require('express')
const router = new Router()

const adminAuthRouter = require('./adminAuthRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const imageRouter = require('./imageRouter')

router.use('/admin', adminAuthRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/image', imageRouter)

module.exports = router