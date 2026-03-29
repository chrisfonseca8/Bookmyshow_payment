const {StatusCodes} = require('http-status-codes');
const {detailService} = require('../services');

const getMovieDetails=async(req,res)=>{
    try {
        const movieId = req.params.id
        const response = await detailService.getMovieDetails(movieId);
        return res.status(StatusCodes.OK).json({
            response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
           error,
           message:'something wrong in controllers'
        })
    }
}

module.exports={
    getMovieDetails
}