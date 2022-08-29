const Users = require('@models/Users')
const getModelData = require('@utilsControllers/getModelData')
const serverResponse = require('@utils/serverResponse')

async function isAuthenticated(req,res,next){

    const { idUser } = req.params

    const user = await getModelData(Users,idUser)
   
    if(user.error){
        res.json(serverResponse(user.response,true))
    }else{
        if(user.response){

            const ativo = user.response.ativo

            if(ativo){
                next()
            }else{
                res.json(serverResponse('Usuário não está autenticado', true))
            }
        }else{
            res.json(serverResponse('Usuário não existe', true))
        }
    }
}

module.exports = isAuthenticated