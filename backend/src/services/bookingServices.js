const {StatusCodes} = require('http-status-codes');

const {seatRepo} = require('../repositories');


const initiateBookingservice =async(hallId,seats)=>{
    try {
        const response = await seatRepo.initiateSeatBooking(hallId,seats);
        console.log(response)
        return response;
    } catch (error) {
        console.log('some error in initateBooking Service',error)
    }
}
const confirmBookingService =async(hallId,seats)=>{
    try {
        const response = await seatRepo.confirmBooking(hallId,seats);
        return response;
    } catch (error) {
        console.log('some error in confirmBooking Service',error)
    }
}

module.exports = {
    initiateBookingservice,
    confirmBookingService
}