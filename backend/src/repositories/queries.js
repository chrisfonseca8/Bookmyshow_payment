function lockrowforUpdate(seatId){
    `SELECT* FROM seats WHERE id = ${seatId} FOR UPDATE`
}

module.exports = {
    lockrowforUpdate
}