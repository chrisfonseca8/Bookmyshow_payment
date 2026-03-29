const {detailRepo} = require('../repositories');


const getMovieDetails=async(movieId)=>{
    try {
        const response = await detailRepo.getDetails(movieId);
        return response
    } catch (error) {
        console.log("Something went wrong in service layer")
    }   
}

module.exports={
    getMovieDetails
}