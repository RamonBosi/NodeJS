const Addresses = require('@models/Addresses')
const getModelDataRelational = require('@utilsControllers/getModelDataRelational')
const serverResponse = require('@utils/serverResponse')

//req.body = {uf: '', cidade: '', rua: '', bairro: ''}

const ControllerAddress = {
    createAddress(req,res){

        const { idUser } = req.params

        const address = {
            ...req.body,
            UserId: idUser
        }

        Addresses.create(address)
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err,true)))
    },
    async updateAddress(req,res){

        const newAddress = req.body
        const { idUser, idAddress } = req.params

        const oldAddress = await getModelDataRelational(Addresses,idAddress,idUser)
        
        if(oldAddress.error){
            res.json(serverResponse(oldAddress.response, true))
        }else{
            if(oldAddress.response){
                const data = {
                    uf: oldAddress.response.uf,
                    cidade: oldAddress.response.cidade,
                    rua: oldAddress.response.rua,
                    bairro: oldAddress.response.bairro,
                    ...newAddress
                }
    
                Addresses.update(data,{where: {id: idAddress,UserId: idUser}})
                .then((resDb) => res.json(serverResponse(resDb)))
                .catch((err) => res.json(serverResponse(err, true)))
            }else{
                res.json(serverResponse('Endereço não existe', true))
            }
        }
    },
    removeAddress(req,res){

        const { idUser, idAddress } = req.params

        Addresses.destroy({where: {id: idAddress, UserId: idUser}})
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err, true)))
    }
}

module.exports = ControllerAddress