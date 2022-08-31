const { DataTypes } = require('sequelize')
const db = require('@database')

const Users = db.define('Users',{
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf:{
        type: DataTypes.CHAR(11),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    ativo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = Users