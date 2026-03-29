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

const checkSeatAvailability = async (req, res,next) => {
    const { hallId, seats } = req.body;
    try {
         await seatservice.checkSeatAvailability(hallId, seats);

        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
        next();
    } catch (error) {
        console.error("Seat check failed:", error.message);

        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message || "Seat validation failed"
        });
    }
};

module.exports = {
  allSeats,
  checkSeatAvailability
}