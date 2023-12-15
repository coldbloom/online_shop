const Router = require('express')
const router = new Router
const adminAuthController = require('../controllers/adminAuthController')
const {verifyAuthorizationMiddleware, verifyRefreshTokenMiddleware} = require('../auth/utils')

router.post('/login', adminAuthController.login)
router.get('/logout', adminAuthController.logout)
router.get('/refresh', verifyRefreshTokenMiddleware, adminAuthController.refresh)
router.get('/profile', verifyAuthorizationMiddleware, adminAuthController.profile)

module.exports = router