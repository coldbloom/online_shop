require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')

const router = require('./routes/index')
const crypto = require("crypto");
const {passwordSecret} = require("./auth/data"); // импорт основного маршрута


const PORT = process.env.PORT;
const app = express();

// Установка папки 'public' в качестве статической директории
app.use(express.static('media'));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(express.json({ extended: true }));  // для того чтобы наше приложение могло парсить json-формат

app.use('/api', router)  // слушаем маршруты


app.get("/", (req, res) => {
    res.json("ПРивет, я работаю!")
})

const hash = crypto
    .createHmac("sha256", passwordSecret)
    .update('admin')
    .digest("hex")

console.log(hash)
console.log(`Равны ли пароли: ${hash === '387fc3464b7558755bc2c192d20b37c781666086d13496adcff2720a139a3daf'}`)

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