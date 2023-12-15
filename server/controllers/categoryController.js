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
            const clearCategories = categories.map(item => {
                return {
                    id: item.id,
                    name: item.name
                }
            });
            return res.json(clearCategories)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(401).json({ error: 'Category not found' });
            }

            await category.destroy();
            return res.json({ message: 'Category deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const { newName } = req.body;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(401).json({ error: 'Category not found' })
            }

            category.name = newName;
            await category.save();

            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CategoryController()
