const { Product } = require('./../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async crete(req, res, next) {
        try {
            const {name, price, categoryId} = req.body;
            const product = await Product.create({name, price, categoryId})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req ,res, next) {
        try {
            const product = await Product.findAll()
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {

    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(401).json({ error: 'Product not found' });
            }

            await product.destroy()
            return res.json({ message: 'Product deleted successfully'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController();