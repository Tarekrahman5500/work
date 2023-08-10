const ErrorResponse = require("./errorResponse");
const errorHandler = (err, req, res, next) =>{

   // console.log(err);
    let error = {...err}
    error.message = err.message;
    console.log(error.message);

    // Mongoose Bad ObjectId
    if (err.name === 'CastError'){
        const message =`Resource not found. Invalid: ${err.path}`
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        error = new ErrorResponse(message, 400);
    }

    if  (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(message, 400);

    }

    res.status(error.statusCode ).json({
        success: false,
        error: error.message
    })

    next()
}

module.exports = errorHandler;