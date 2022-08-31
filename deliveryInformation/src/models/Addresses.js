const { DataTypes } = require('sequelize')

const db = require('@database')
const Users = require('@models/Users')

const Addresses = db.define('Addresses',{
    uf:{
        type: DataTypes.CHAR(2),
        allowNull: false
    },
    cidade:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rua:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    bairro:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

Addresses.belongsTo(Users, {
    onDelete: 'cascade'
})
Users.hasMany(Addresses)

module.exports = Addresses