const {User} = require('../models/models')
const ApiError = require('../error/apiError')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    const token = jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
    return token;
}

class UserController {
    async registration (req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'));
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "registration error"});
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь с такой электронной почтой не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан Неверный пароль'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "login error"})
        }
    }

    async check (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "check error"})
        }
    }
}

module.exports = new UserController()