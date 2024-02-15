const { Brand } = require('./../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create (req, res, next) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async getAll (req, res, next) {
        try {
            const brands = await Brand.findAll()
            // const clearBrands = brands.map(item => {
            //     return {
            //         id: item.id,
            //         name: item.id
            //     }
            // })
            return res.json(brands)
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const brand = await Brand.findByPk(id);

            await brand.destroy();
            return res.json({ message: `Brand with ${id} deleted successful` })
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }
}

module.exports = new BrandController()