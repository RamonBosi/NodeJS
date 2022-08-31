const { Op } = require('sequelize')

async function verifyUserEmailCpf(user,email,cpf,action){

    const emailCpf = await user.findAll({
        raw: true,
        attributes: ['email', 'cpf'],
        where: {
            [Op.or]: [
                {email},
                {cpf}
            ]
        }
    })
    .then((res) => {

        //res = [] || res=[{email: '', cpf: ''}, ...]
        const sucess = {error: false}
        const error = {error: true, response: 'Esse email ou cpf já estão sendo usados, escolha outros'}

        if(action === 'create'){

            if(!res.length){
                return sucess
            }else{
                return error
            }
        }else{

            //update
            if(res.length === 1){
                return sucess
            }else{
                return error
            }
        }
    })
    .catch((err) => {return {error: true, response: err}})

    return emailCpf
}

module.exports = verifyUserEmailCpf