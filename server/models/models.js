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
    about: {type: DataTypes.STRING},
})

const ProductImage= sequelize.define('productImage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    path: {type: DataTypes.STRING, unique: true, allowNull: false},
    order: {type: DataTypes.INTEGER}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductSize = sequelize.define('productSize', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    available: {type: DataTypes.BOOLEAN, allowNull: false}
})

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(ProductImage, { as: 'images' }) // параметр as используется для определения псевдонима (алиаса) для отношений
ProductImage.belongsTo(Product)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Type.hasMany(Product)
Product.belongsTo(Type)

Type.hasMany(Size)
Size.belongsTo(Type)

Product.hasMany(ProductSize)
ProductSize.belongsTo(Product)

Size.hasMany(ProductSize)
ProductSize.belongsTo(Size)


module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    Brand,
    Type,
    Size,
    ProductSize,
}