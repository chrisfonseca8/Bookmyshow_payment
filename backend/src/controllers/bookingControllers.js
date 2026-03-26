const {StatusCodes} = require('http-status-codes');
const {bookingService} = require('../services')


const initateBookingController=async (req,res) => {
    //console.log('booking controller is working')
    const {hallId,seats} = req.body;
    try {
        const responce = await bookingService.initiateBookingservice(hallId,seats);
        return res.status(StatusCodes.ACCEPTED).json(responce)
    } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
    }

}

const confirmBookingController=async (req,res) => {
    //console.log('booking controller is working')
    const {hallId,seats} = req.body;
    try {
        const responce = await bookingService.confirmBookingService(hallId,seats);
        return res.status(StatusCodes.ACCEPTED).json(responce)
    } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
    }

}

module.exports = {
    initateBookingController,
    confirmBookingController
}