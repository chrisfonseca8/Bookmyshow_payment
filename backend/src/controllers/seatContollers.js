const { StatusCodes } = require("http-status-codes");

const { seatservice } = require("../services");

const allSeats = async (req, res) => {
  try {
    const response = await seatservice.allSeats();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};


module.exports = {
    allSeats
}