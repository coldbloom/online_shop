const { Product } = require('./../models/models')
const ApiError = require('../error/ApiError')
const {ProductImage} = require("../models/models");

const multer  = require('multer');
const memoryStorage = multer.memoryStorage();
const fs = require("fs");
const fsExtra = require("fs-extra")
const path = require('path');

const getDifference = (arr1, arr2) => {
    return arr1.filter(item => !arr2.includes(item))
}

const getImageName = (path) => {
    return path.substring(path.lastIndexOf('/') + 1)
}

const upload = multer({ storage: memoryStorage }); // указывается путь для сохранения файлов в буфферной зоне
class ProductController {

    async create(req, res, next) {
        try {
            upload.any()(req, res, async function (err) {
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }

                const {name, price, categoryId, about} = req.body;
                const existingProduct = await Product.findOne({ where: { name: name } });
                if (existingProduct) {
                    return res.status(400).json({ message: 'Имя товара уже существует' });
                }
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
                                order: idx + 1,
                                productId: productId,
                            });
                        }
                    });
                }));

                const imagesArray = images.map((image, idx) => {
                    return {
                        path: `images/${productId}/${image.originalname}`,
                        productId: productId,
                        order: idx + 1
                    }
                })

                const resData = {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    about: product.about,
                    images: imagesArray
                }

                return res.json(resData);
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            upload.any()(req, res, async function (err) {
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }

                const updatedFields = req.body;
                const newImages = req.files;

                let allImagesInBD = []

                let actualOldImages = [];
                let deletedImages = [];

                for (const key in updatedFields) {
                    if (Object.prototype.hasOwnProperty.call(updatedFields, key)) {
                        const obj = JSON.parse(updatedFields[key]);
                        actualOldImages.push(obj.name);
                    }
                }

                const {id} = req.params;
                const imagesFolderPath = `media/images/${id}`;
                const product = await Product.findByPk(id, {
                    include: 'images' // Включаем связанные записи из таблицы ProductImage
                });
                if (!product) {
                    return res.status(401).json({ error: 'Product not found' });
                }

                allImagesInBD = product.images.map(item => {
                    return {
                        name: getImageName(item.dataValues.path),
                        id: item.dataValues.id,
                        order: item.dataValues.order,
                    }
                })
                console.log(allImagesInBD, ' = allImagesInBD Что лежит в массиве id и name всех фотогравий из бд')

                fs.readdir(imagesFolderPath, (err, files) => {
                    if (err) {
                        console.error('Ошибка чтения содержимого директории:', err);
                    } else {
                        const imageNames = files; // Добавляем все файлы в массив imageNames
                        console.log(imageNames, ` = imageNames Наименования изображений, которые хранятся в папке ${id}`); // Полученные названия файлов добавляются в массив imageNames

                        deletedImages = getDifference(imageNames, actualOldImages)
                        console.log(deletedImages, ' изображения которые нужно удалить')
                    }
                })

                console.log(' patch update product request')
                console.log(updatedFields, ' = req.body')
                console.log(newImages, ' = req.files')



                return res.json('update product')
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
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

    async checkName(req, res, next) {
        try {
            let result = false
            const { name } = req.body;

            const product = await Product.findOne({ where: { name: name } });
            if (product) {
                console.log(product); // Вывод найденного продукта
                result = false
            } else {
                console.log('Продукт не найден');
                result = true
            }

            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController();