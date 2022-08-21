

const errorHandler = (error, req, res, next) => {

    const errorStatus = error.status || 400
    const errorMessage = error.message
    res.status(errorStatus).json({
        message : errorMessage,
        status  : errorStatus,
        stack   : error.stack
    })
}



export default errorHandler