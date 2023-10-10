const { Product, ProductImage  } = require('./../models/models')
const ApiError = require('../error/ApiError')

const fs = require('fs');
const path = require('path');
const multer = require('multer')

class ProductImageController {

    async create(req, res, next) {
        try {
            const { id } = req.params; // получаем id продукта из параметров запроса

            const product = await Product.findByPk(id); // находим продукт по id

            if (!product) {
                return next(ApiError.badRequest(`Product with id ${id} not found.`));
            }

            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    const dir = `media/images/${id}`; // создаем путь к папке с id продукта
                    if (!fs.existsSync(dir)) { // проверяем, существует ли папка
                        fs.mkdirSync(dir); // если папки нет, то создаем ее
                    }
                    cb(null, dir); // указываем папку, куда будут сохраняться файлы

                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '-' + file.originalname); // генерируем уникальное имя файла
                }
            });


            const upload = multer({ storage: storage });

            upload.single('image')(req, res, async function (err) { // добавляем async перед функцией обратного вызова
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }
                const image = req.file;

                // сохраняем путь к файлу в базу данных
                const productImage = await ProductImage.create({
                    path: path.join(`media/images/${id}`, image.filename), // формируем путь к файлу
                    productId: id
                });

                res.json(productImage); // отправляем созданную запись в ответе
            });

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { id } = req.params; // получаем id продукта из параметров запроса

            const dir = `media/images/${id}`; // создаем путь к папке с id продукта

            if (!fs.existsSync(dir)) { // проверяем, существует ли папка
                return res.json([]); // если папки нет, то возвращаем пустой массив
            }

            const files = fs.readdirSync(dir); // получаем список файлов в папке

            const images = files.map(file => {
                return {
                    path: path.join(dir, file), // формируем путь к файлу
                }
            });

            res.json(images); // отправляем массив изображений в ответе

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ProductImageController();