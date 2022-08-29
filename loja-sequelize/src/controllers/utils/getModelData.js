async function getModelData(model, primaryKey){

    const data = await model.findOne({raw: true, where:{id: primaryKey}})
    .then((res) => {return {error: false, response: res}})
    .catch((err) => {return {error: true, response: err}})

    return data
}

module.exports = getModelData