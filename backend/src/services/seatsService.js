const {seatRepo} = require('../repositories');
const {Op} = require('sequelize')
const {statusEnum } = require("../utils/common/ENUM");
//const { Classic, Classic_Plus, Recliner, Prime } = seatNameEnum;
const { Booked, UnBooked, Initiated, Cancelled } = statusEnum;





const allSeats = async () => {
    const response = await seatRepo.allSeats();
    return response;
}


const checkSeatAvailabilityService = async (hallId, seats) => {

    const response = await seatRepo.checkSeatAvailability(hallId, seats);
        console.log('seat service working properly')
    const invalidSeat = response.find(
        seat => seat.status != Initiated
    );

    if (invalidSeat) {
        throw new Error(`Seat booking expired`);
    }

    return response;
};


module.exports = {
    allSeats,
    checkSeatAvailabilityService
}