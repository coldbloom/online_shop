const { Category } = require('./../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const category = await Category.create({name})
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll()
            return res.json(categories)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(401).json({ error: 'Category not found 11111' });
            }

            await category.destroy();
            return res.json({ message: 'Category deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CategoryController()
