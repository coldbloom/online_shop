const { Type} = require('./../models/models')
const ApiError = require('../error/ApiError')

class ProductTypesControllers {
    async create (req, res, next) {
        try {
            console.log('create')
            const {name} = req.body;
            console.log(name)
            const type = await Type.create({name});
            return res.json(type);
        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }

    async getAll (req, res, next) {
        try {
            const productTypes = await Type.findAll();
            const clearProductTypes = productTypes.map(type =>
                ({ id: type.id, name: type.name })
            );
            return res.json(clearProductTypes)
        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }

    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const type = await Type.findByPk(id);

            await type.destroy()
            return res.json({ message: `Type with ${id} deleted successful` })
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async put (req, res, next) {
        try {
            const {id} = req.params;
            const {newName} = req.body;
            const type = await Type.findByPk(id);

            if (!type) {
                return res.status(401).json({ error: 'Type not found' });
            }

            type.name = newName;
            await type.save();

            return res.json(type)
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }
}

module.exports = new ProductTypesControllers()