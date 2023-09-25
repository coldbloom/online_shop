const { Category } = require('./../models/models')

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async delete(req, res) {
        console.log(req.params)
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(401).json({ error: 'Category not found 11111' });
        }

        await category.destroy();
        return res.json({ message: 'Category deleted successfully' });
    }
}

module.exports = new CategoryController()
