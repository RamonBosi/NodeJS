const routes = require('express').Router()
const { 
    createPaymentMethods, 
    removePaymentMethods, 
    updatePaymentMethods 
} = require('@controllers/controllerPaymentMethods')
const isAuthenticated = require('@middlewares/isAuthenticated')

routes.post('/user/:idUser/create',isAuthenticated,createPaymentMethods)
routes.put('/user/:idUser/update/:idPaymentMethods',isAuthenticated, updatePaymentMethods)
routes.delete('/user/:idUser/remove/:idPaymentMethods',isAuthenticated, removePaymentMethods)

module.exports = routes