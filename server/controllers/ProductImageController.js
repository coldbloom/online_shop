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
                    path: path.join(`images/${id}`, image.filename), // формируем путь к файлу
                    productId: id
                });

                res.json(productImage); // отправляем созданную запись в ответе
            });

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;

            const productImage = await ProductImage.findByPk(id);

            if (!productImage) {
                return next(ApiError.badRequest(`Image with ${id} not found`));
            }

            const imagePath = path.join('media', productImage.path);

            //удаляем файл из папки
            fs.unlink(imagePath, (error) => {
                if (error) {
                    return next(ApiError.internal(error.message));
                }

                //удаляем запись о файле из базы данных
                ProductImage.destroy({ where: {id} })
                    .then(() => {
                        //res.sendStatus(204); // Возвращаем статус 204 No Content в случае успеха
                        return res.status(200).json({ message: "Изображение успешно удалено" });
                    })
                    .catch((error) => {
                        next(ApiError.internal(error.message));
                    })
            });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ProductImageController();