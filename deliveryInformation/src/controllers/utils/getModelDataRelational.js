async function getModelDataRelational(model, primaryKey, foreignKey){

    const data = await model.findOne({
        raw: true, 
        where:{id: primaryKey, UserId: foreignKey}
    })
    .then((res) => {return {error: false, response: res}})
    .catch((err) => {return {error: true, response: err}})

    return data
}

module.exports = getModelDataRelational