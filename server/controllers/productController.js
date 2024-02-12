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

function sortByOrder(images) {
    return images.sort((a, b) => a.order - b.order);
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

                const {id} = req.params;
                const product = await Product.findByPk(id, {
                    include: 'images' // Включаем связанные записи из таблицы ProductImage
                });
                if (!product) {
                    return res.status(401).json({ error: 'Product not found' });
                }

                const allImagesFromDB = product.images.map(item => {
                    return {
                        name: getImageName(item.dataValues.path),
                        id: item.dataValues.id,
                        order: item.dataValues.order,
                    }
                })

                const requestData = req.body;

                let resDataImages = {}

                if (Object.keys(requestData).includes('oldImages')) {
                    const updatedImagesNames = JSON.parse(requestData.oldImages).map(item => item.name)
                    // собираем ответ из актуальных изображений из req.data
                    resDataImages = JSON.parse(requestData.oldImages).map(image => {
                        return {
                            id: image.id,
                            order: image.order,
                            path: `images/${id}/${image.name}`
                        }
                    })
                    const deletedImages = allImagesFromDB.filter(item => !updatedImagesNames.includes(item.name))

                    if (deletedImages.length !== 0) {
                        for (let i = 0; i < deletedImages.length; i++) {
                            const { name: imageName, id: imageId } = deletedImages[i]
                            //const imagePath2 = path.join(`media/images/${id}/`, imageName)
                            const imagePath = `media/images/${id}/${deletedImages[i].name}`

                            //удаляем файл из папки
                            fs.unlink(imagePath, (error) => {
                                if (error) {
                                    return next(ApiError.internal(error.message));
                                }

                                //удаляем запись о файле из базы данных
                                ProductImage.destroy({ where: {id: imageId} })
                                    .then(() => {
                                        console.log(`Изображение ${imageName} удалено; Запись ProductImage в базе данных с id = ${imageId} удалено!`)
                                    })
                                    .catch((error) => {
                                        next(ApiError.internal(error.message));
                                    })
                            });
                        }
                    }

                    // если порядок изображений, запись которых уже есть в базе и файл которых лежит в папке media/images
                    if (requestData.oldImages.length !== 0) {
                        const updateImages = JSON.parse(requestData.oldImages);
                        for (let i = 0; i < updateImages.length; i++) {
                            const { name: imageName, id: imageId, order } = updateImages[i]

                            // Найти запись productImage по идентификатору
                            const productImage = await ProductImage.findByPk(imageId);

                            if (productImage) {
                                // Изменить поле order на новое значение
                                productImage.order = order;

                                await productImage.save();
                            } else {
                                console.log(`ProductImage с ${imageId} не найден в Базе Данных`)
                                return next(ApiError.internal(`ProductImage с ${imageId} не найден в Базе Данных`));
                            }
                        }
                    }
                } else {
                    // собираем ответ из актуальных изображений из БД
                    resDataImages = product.images.map(item => {
                        return {
                            path: item.path,
                            id: item.dataValues.id,
                            order: item.dataValues.order,
                        }
                    })
                }

                // если пользователь добавил новые изображения в req.files
                const newImages = req.files;

                if (newImages.length !== 0) {
                    const dir = `media/images/${id}`

                    if (!fs.existsSync(dir)) {
                        return next(ApiError.internal(`Папки с ${id} продукта не найдено media/images`));
                    }

                    const createdImages = await Promise.all(newImages.map(async (file, idx) => {
                        const imagePath = `${dir}/${file.originalname}`;
                        const order = file.fieldname[file.fieldname.lastIndexOf('=') + 1];

                        return new Promise((resolve, reject) => {
                            fs.writeFile(imagePath, file.buffer, { encoding: 'binary' }, async (err) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                } else {
                                    try {
                                        const createdProductImage = await ProductImage.create({
                                            path: `images/${id}/${file.originalname}`,
                                            order: order,
                                            productId: id,
                                        });
                                        resolve(createdProductImage);
                                    } catch (error) {
                                        reject(error);
                                    }
                                }
                            });
                        });
                    }));

                    resDataImages = [...resDataImages, ...createdImages.map(image => ({
                        id: image.dataValues.id,
                        order: image.dataValues.order,
                        path: image.dataValues.path
                    }))];
                }

                // если в req.data есть поля которые требуют редактирования, кроме изображений
                const fields = Object.keys(requestData).filter(key => key !== 'oldImages')
                if (fields.length !== 0) {
                    fields.forEach(field => {
                        switch (field) {
                            case 'name':
                                product.name = requestData.name
                                break;
                            case 'about':
                                product.about = requestData.about
                                break;
                            case 'price':
                                product.price = requestData.price
                                break;
                            case 'categoryId':
                                product.categoryId = requestData.categoryId
                                break;
                        }
                    });

                    // Сохранение изменений в базе данных с использованием Sequelize
                    try {
                        await product.save(); // Используем метод save для сохранения обновленных данных в базе
                        console.log('Изменения сохранены в базе данных');
                    } catch (error) {
                        console.error('Ошибка при сохранении изменений в базе данных:', error);
                    }
                }

                const resData = {
                    id: Number(id),
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    about: product.about,
                    images: sortByOrder(resDataImages)
                }
                return res.json(resData)
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req ,res, next) {
        try {
            const { page = 1, limit = 20, categoryId, sort } = req.query;
            const offset = (page - 1) * limit;

            const filterOptions = {
                offset: offset,
                limit: limit,
                include: 'images'
            };

            if (sort) {
                if (sort === 'desc') {
                    filterOptions.order = [['price', 'DESC']];
                } else if (sort === 'asc') {
                    filterOptions.order = [['price', 'ASC']];
                }
            }

            if (categoryId) {
                filterOptions.where = { categoryId: categoryId };
            }

            const products = await Product.findAndCountAll(filterOptions);
            const totalCount = products.rows.length
            const response = {
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                products: products.rows.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    about: product.about,
                    images: product.images.map(image => ({
                        path: image.path,
                        id: image.id,
                        order: image.order
                    }))
                }))
            };

            return res.json(response);
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