require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')

const router = require('./routes/index') // импорт основного маршрута


const PORT = process.env.PORT || 3031;
const app = express();

//для commit 222
// Установка папки 'public' в качестве статической директории
app.use(express.static('media'));

app.use(cors());

app.use(express.json({ extended: true }));  // для того чтобы наше приложение могло парсить json-формат

app.use('/api', router)  // слушаем маршруты


app.get("/", (req, res) => {
    res.json("ПРивет, я работаю!")
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is started on the port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();