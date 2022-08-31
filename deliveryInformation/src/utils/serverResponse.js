function serverResponse(response, error=false){
    return {
        error: error,
        response: response
    }
}

module.exports = serverResponse