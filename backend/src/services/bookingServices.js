const { StatusCodes } = require('http-status-codes');

const { seatRepo } = require('../repositories');
const {checkSeatAvailabilityService} = require('./seatsService')

const { paymentRequest,
    paytmPaymentGateway,
    RazorPayPaymentGateway,
    proxyPaymentGateway,
    paymentObject } = require('./paymentService')



// const paymentObject ={
//     paytm:[new paymentGateway(),3],
//     razorPay:[new RazorPayPaymentGateway(),5]
// }


//   const request =  new paymentRequest('chris','fonseca','INR',1000);

//   const gateway = new paytmPaymentGateway();
//   const proxy = new proxyPaymentGateway(3,gateway)

//   const result = proxy.paymetProcess(request);



const initiateBookingservice = async (hallId, seats) => {
    try {
        const response = await seatRepo.initiateSeatBooking(hallId, seats);
        console.log(response)
        return response;
    } catch (error) {
        console.log('some error in initateBooking Service', error);
        throw error
    }
}

//request object:{
//     sender,
//     receiver,
//     currency,
//     amount,
//      gateway
// }
const confirmPaymentService = async (request) => {
    const { gateway } = request;

    try {
        let proxy;

        if (gateway === 'paytm') {
            const usingGateway = new paytmPaymentGateway();
            proxy = new proxyPaymentGateway(3, usingGateway);
        } 
        else if (gateway === 'razorPay') {
            const usingGateway = new RazorPayPaymentGateway();
            proxy = new proxyPaymentGateway(5, usingGateway);
        } 
        else {
            throw new Error('not valid payment option');
        }

        const result = await proxy.paymetProcess(request);

        return result;

    } catch (error) {
        console.error("Payment failed:", error.message);
        throw new Error('payment failed');
    }
};

const confirmBookingService = async (hallId, seats) => {
    try {
        const response = await seatRepo.confirmBooking(hallId, seats);
        return response;
    } catch (error) {
    console.error('Error in confirmBookingService:', error.message);
    throw error;
}
}


const bookTicketService = async (request) => {
    const { hallid, sender, receiver, currency, amount, gateway, seats } = request;


    await checkSeatAvailabilityService(hallid, seats);

    const paymentResult = await confirmPaymentService({
        sender,
        receiver,
        currency,
        amount,
        gateway
    });

    if (!paymentResult || paymentResult.success !== true) {
        throw new Error("Payment failed");
    }

    const bookingResult = await confirmBookingService(hallid, seats);

    return {
        payment: paymentResult,
        booking: bookingResult
    };
};

module.exports = {
    initiateBookingservice,
    confirmBookingService,
    confirmPaymentService,
    bookTicketService
}