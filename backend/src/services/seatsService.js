const {seatRepo} = require('../repositories');


const allSeats = async () => {
    const response = await seatRepo.allSeats();
    return response;
}

module.exports = {
    allSeats
}