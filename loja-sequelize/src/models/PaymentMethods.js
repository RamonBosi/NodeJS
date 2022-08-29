const { DataTypes } = require('sequelize')

const db = require('@database')
const Users = require('@models/Users')

const PaymentMethods = db.define('PaymentMethods',{
    formaPagamento:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

PaymentMethods.belongsTo(Users,{
    onDelete: 'cascade'
})
Users.hasMany(PaymentMethods)

module.exports = PaymentMethods
