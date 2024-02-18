const ApiError = require("../error/ApiError");
const {Size} = require("../models/models")

class SizeControllers {
    async create(req, res, next) {
        try {
            const { name, typeId } = req.body;
            const newSize = await Size.create({ name, typeId });
            return res.json(newSize);
        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res, next) {
        try {
            const sizes = await Size.findAll();
            // проверить
            const clearSizes = sizes.map(size => ({
                id: size.id,
                name: size.name,
                typeId: size.typeId
            }));
            return res.json(clearSizes)
        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;

            const size = await Size.findByPk(id);

            if (!size) {
                return res.status(401).json({ error: 'Size not found' });
            }

            await size.destroy();
            return res.json({ message: 'Size deleted successfully' });
        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }

    async put(req, res, next){
        try {

        } catch (e) {
            ApiError.badRequest(e.message);
        }
    }
}

module.exports = new SizeControllers()