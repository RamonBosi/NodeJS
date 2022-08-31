const routes = require('express').Router()
const { 
    createUser, 
    removeUser, 
    updateUser,
    loginUser,
    logoutUser,
    getDataUser
} = require('@controllers/controllerUser')
const isAuthenticated = require('@middlewares/isAuthenticated')

routes.post('/create',createUser)
routes.put('/login',loginUser)

routes.get('/:idUser/getData',isAuthenticated,getDataUser)
routes.put('/:idUser/logout',isAuthenticated,logoutUser)
routes.delete('/:idUser/remove',isAuthenticated, removeUser)
routes.put('/:idUser/update',isAuthenticated, updateUser)

module.exports = routes