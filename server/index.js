require('dotenv').config() // без этой строчки мы не можем обращаться к переменным из .env
const express = require('express') // импортируем модуль express
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express() // создаем объект express (запуск приложения)
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);

// обработка ошибок последний Middleware
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING'})
})

const start = async () => {
    try {
        await sequelize.authenticate() // подключение к базе данных перед запуском сервера
        await sequelize.sync() // эта ф-я сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
