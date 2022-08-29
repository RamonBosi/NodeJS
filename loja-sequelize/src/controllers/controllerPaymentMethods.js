const PaymentMethods = require('@models/PaymentMethods')
const getModelDataRelational = require('@utilsControllers/getModelDataRelational')
const serverResponse = require('@utils/serverResponse')

//req.body = {formaPagamento: ''}

const ControllerPaymentMethods = {
    createPaymentMethods(req,res){

        const { idUser } = req.params

        const address = {
            ...req.body,
            UserId: idUser
        }

        PaymentMethods.create(address)
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err,true)))
    },
    async updatePaymentMethods(req,res){

        const { idUser, idPaymentMethods } = req.params

        const oldPaymentMethods = await getModelDataRelational(PaymentMethods,idPaymentMethods,idUser)
        
        if(oldPaymentMethods.error){
            res.json(serverResponse(oldPaymentMethods.response, true))
        }else{
            if(oldPaymentMethods.response){
    
                const newPaymentMethods = req.body

                PaymentMethods.update(newPaymentMethods,{
                    where: {id: idPaymentMethods,UserId: idUser}
                })
                .then((resDb) => res.json(serverResponse(resDb)))
                .catch((err) => res.json(serverResponse(err, true)))
            }else{
                res.json(serverResponse('Forma de pagamento não existe', true))
            }
        }
    },
    removePaymentMethods(req,res){

        const { idUser, idPaymentMethods } = req.params

        PaymentMethods.destroy({where: {id: idPaymentMethods, UserId: idUser}})
        .then((resDb) => res.json(serverResponse(resDb)))
        .catch((err) => res.json(serverResponse(err, true)))
    }
}

module.exports = ControllerPaymentMethods