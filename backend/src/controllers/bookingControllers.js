const { StatusCodes } = require('http-status-codes');
const { bookingService } = require('../services');
const { seatservice } = require("../services");


const initateBookingController = async (req, res) => {
    //console.log('booking controller is working')
    const { hallId, seats } = req.body;
    try {
        const responce = await bookingService.initiateBookingservice(hallId, seats);
        console.log(responce)
        return res.status(StatusCodes.ACCEPTED).json(responce)
    } catch (error) {
        console.log("some error in controller")
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:error.message||'some promblem occured during booking seats'
        })
    }

}

//request object:{
//     sender,
//     receiver,
//     currency,
//     amount,
//      gateway
// }

const confirmPaymentController = async (req, res, next) => {
    const request = req.body;

    try {
        const response = await bookingService.confirmPaymentService(request);

        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
    //    next();

    } catch (error) {
        console.error("Error in controller:", error.message);

        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message || "Payment failed"
        });
    }
};


// const confirmBookingController = async (req, res) => {
//     //console.log('booking controller is working')
//     const { hallId, seats } = req.body;
//     try {
//         const responce = await bookingService.confirmBookingService(hallId, seats);
//         return res.status(StatusCodes.ACCEPTED).json(responce)
//     } catch (error) {
//         return res.status(StatusCodes.BAD_REQUEST).json(error)
//     }

// }




const confirmBooking = async (req, res) => {
    const { hallId, sender, receiver, currency, amount, gateway, seats } = req.body;

    try {
        const response = await bookingService.bookTicketService({
            hallid: hallId,
            sender,
            receiver,
            currency,
            amount,
            gateway,
            seats
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    initateBookingController,
    confirmBooking,
    confirmPaymentController
}




