const { Product } = require('./../models/models')
const ApiError = require('../error/ApiError')
const {ProductImage} = require("../models/models");

const multer  = require('multer');
const memoryStorage = multer.memoryStorage();
const fs = require("fs");
const fsExtra = require("fs-extra")
const path = require('path');

const upload = multer({ storage: memoryStorage }); // указывается путь для сохранения файлов в буфферной зоне

class ProductController {

    async create(req, res, next) {
        try {
            upload.any()(req, res, async function (err) {
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }

                const {name, price, categoryId, about} = req.body;
                const product = await Product.create({name, price, categoryId, about})
                const productId = product.id;

                const images = req.files;

                console.log(images, 'сами файлы')

                const dir = `media/images/${productId}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir)
                }

                await Promise.all(images.map(async (file, idx) => {
                    const imagePath = `${dir}/${file.originalname}`

                    fs.writeFile(imagePath, file.buffer, { encoding: 'binary' }, async (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            await ProductImage.create({
                                path: `images/${productId}/${file.originalname}`,
                                productId: productId,
                                order: idx + 1
                            });
                        }
                    });
                }));

                const productImage = await ProductImage.findOne({
                    where: {
                        id: productId
                    }
                });

                console.log(productImage);

                return res.json(product);
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req ,res, next) {
        try {
            const products = await Product.findAll({
                include: 'images' // Используем имя связи 'images'
            });

            const responseData = products.map(product => {
                const images = product.images.map(image => {
                    return {
                        path: image.path,
                        id: image.id,
                        order: image.order
                    }
                }); // Используем 'product.images'
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    about: product.about,
                    images: images
                }
            })
            return res.json(responseData);
            // const product = await Product.findAll()
            // return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {

    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(id, {
                include: 'images' // Включаем связанные записи из таблицы ProductImage
            });

            if (!product) {
                return res.status(401).json({ error: 'Product not found' });
            }

            const imagesFolderPath = `media/images/${id}`;

            // Удаление связанных записей ProductImage
            await Promise.all(product.images.map(async (image) => {
                await image.destroy();
            }));

            await product.destroy()

            // Удаление папки и ее содержимого
            await fsExtra.remove(imagesFolderPath);
            return res.json({ message: 'Product deleted successfully'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController();