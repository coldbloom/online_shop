const { Product } = require('./../models/models')

class ProductController {
    async crete(req, res) {
        const {name, price, categoryId} = req.body;
    }
    async getAll(req ,res) {

    }
    async getOne(req, res) {

    }
    async delete(req, res) {

    }
}

module.exports = new ProductController();