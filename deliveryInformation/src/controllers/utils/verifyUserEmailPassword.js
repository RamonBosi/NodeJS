async function verifyUserEmailPassword(user,email, password){

    const thereUser = await user.findOne({
        raw: true, 
        where: {email, senha: password} 
    })
    .then((res) => {return {error: false, response: res}})
    .catch((err) => {return {error: true, response: err}})

    return thereUser
}

module.exports = verifyUserEmailPassword