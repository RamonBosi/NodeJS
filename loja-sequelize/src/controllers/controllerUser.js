const Users = require('@models/Users')
const getModelData = require('@utilsControllers/getModelData')
const verifyUserEmailPassword= require('@utilsControllers/verifyUserEmailPassword')
const verifyUserEmailCpf = require('@utilsControllers/verifyUserEmailCpf')
const serverResponse = require('@utils/serverResponse')

const ControllerUser = {
    async createUser(req,res){

        const userRequest = req.body

        const thereEmailCpf = await verifyUserEmailCpf(
            Users,userRequest.email,userRequest.cpf,'create'
        )
        
        if(thereEmailCpf.error){
            res.json(serverResponse(thereEmailCpf.response,true))
        }else{

            const user = {
                ...userRequest,
                ativo: true
            }
    
            Users.create(user)
            .then((resDb) => res.json(serverResponse(resDb)))
            .catch((err) => res.json(serverResponse(err,true)))
        }
    },
    async updateUser(req,res){

        const newData = req.body

        const thereEmailCpf = await verifyUserEmailCpf(
            Users,newData.email,newData.cpf,'update'
        )

        if(thereEmailCpf.error){
            res.json(serverResponse(thereEmailCpf.response, true))
        }else{

            const { idUser } = req.params
    
            const oldData = await getModelData(Users, idUser)
            
            if(oldData.error){
                res.json(serverResponse(oldData.response, true))
            }else{
                if(oldData.response){
                    
                    const data = {
                        nome: oldData.response.nome,
                        cpf: oldData.response.cpf,
                        email: oldData.response.email,
                        senha: oldData.response.senha,
                        ...newData
                    }
        
                    Users.update(data,{ where: { id: idUser }})
                    .then((resDb) => res.json(serverResponse(resDb)))
                    .catch((err) => res.json(serverResponse(err, true)))
                }else{
                    res.json(serverResponse('Usuário não existe', true))
                }
            }
        }
    },
    removeUser(req,res){

        const { idUser } = req.params

        Users.destroy({where: {id: idUser}})
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err, true)))
    },
    async loginUser(req,res){

        const { email, senha } = req.body

        const findUser = await verifyUserEmailPassword(Users, email, senha)
        
        if(findUser.error){
            res.json(serverResponse(findUser.response, true))
        }else{

            if(findUser.response){
                const idUser = findUser.response.id
                
                Users.update({ativo: true},{where: {id: idUser}})
                .then((resDb) => res.json(serverResponse(resDb)))
                .catch((err) => res.json(serverResponse(err,true)))
            }else{
                res.json(serverResponse('Usuário não existe', true))
            }
        }
    },
    logoutUser(req,res){

        const { idUser } = req.params

        Users.update({ativo: false},{where: {id: idUser}})
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err,true)))
    },
    getDataUser(req,res){

        const { idUser } = req.params

        Users.findOne({
            include: [{all: true}], 
            where: {id: idUser}
        })
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err,true)))
    }
}

module.exports = ControllerUser