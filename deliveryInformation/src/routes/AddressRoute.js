const routes = require('express').Router()
const { 
    createAddress, 
    removeAddress, 
    updateAddress 
} = require('@controllers/controllerAddress')
const isAuthenticated = require('@middlewares/isAuthenticated')

routes.post('/user/:idUser/create',isAuthenticated,createAddress)
routes.put('/user/:idUser/update/:idAddress',isAuthenticated, updateAddress)
routes.delete('/user/:idUser/remove/:idAddress',isAuthenticated, removeAddress)

module.exports = routes