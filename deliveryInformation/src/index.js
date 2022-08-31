require('module-alias/register')
require('dotenv').config()

const express = require('express')

const config = require('@configs')

// const db = require('@database')

const UserRoute = require('@routes/UserRoute')
const AddressRoute = require('@routes/AddressRoute')
const PaymentMethodsRoute = require('@routes/PaymentMethodsRoute')

const port = config.server.port

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/paymentMethods', PaymentMethodsRoute)
app.use('/address', AddressRoute)
app.use('/user', UserRoute)

// db.sync({
//     // alter: true,
//     // force: true
// }).catch((err) => console.log(err))

app.listen(port, (err) =>{
  if(err){
    console.log(err)
  }else{
    console.log(`Servidor rodando na porta ${port}`)
  }
})