const { Brand } = require('./../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create (req, res, next) {
        try {

        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async getAll (req, res, next) {
        try {

        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async delete (req, res, next) {
        try {

        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }
}

module.exports = new BrandController()