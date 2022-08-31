const { Sequelize } = require('sequelize')

const db = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        define:{
            freezeTableName: true,
            // timestamps: false
        }
        // logging: false
        // Estabelecer conexão com o banco de dados da Heroku
        // dialectOptions:{ ssl:{ require: true, rejectUnauthorized: false } }
    }
)

// try{
//     db.authenticate()
//     console.log('Conectado ao PostgreSQL')
// }catch(err){
//     console.log(err)
// }

module.exports = db