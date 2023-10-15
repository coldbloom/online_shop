const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
})

const ProductImage= sequelize.define('productImage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    path: {type: DataTypes.STRING, unique: true, allowNull: false},
})

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(ProductImage, { as: 'images' })
ProductImage.belongsTo(Product)


module.exports = {
    User,
    Category,
    Product,
    ProductImage
}