//here data will contain
/* data:{
    movieId,
    hallId:,
    seatNumber:['string like A12']
}

*/
const { seats } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
//const { lockrowforUpdate } = require("./queries");

const { seatNameEnum, statusEnum } = require("../utils/common/ENUM");
const { Classic, Classic_Plus, Recliner, Prime } = seatNameEnum;
const { Booked, UnBooked, Initiated, Cancelled } = statusEnum;



async function allSeats() {
  const Allseats = await seats.findAll();
  return Allseats;
}

async function initiateSeatBooking(hallId, bookedSeats) {
  const t = await db.sequelize.transaction();
  try {
    const checkedSeats = await seats.findAll({
      where: {
        hallId: hallId,
        seat_number: {
          [Op.in]: bookedSeats,
        },
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    const checkedSeatsId = checkedSeats.map((obj) => obj.id);
    await seats.update(
      { status: Initiated },
      {
        where: {
          id: {
            [Op.in]: checkedSeatsId,
          },
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );

    await t.commit();
    return checkedSeatsId;
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
}

async function confirmBooking(hallId, bookedSeats) {
  const t = await db.sequelize.transaction();

    try {
    const intiatedSeats = await seats.findAll({
      where: {
        hallId: hallId,
        seat_number: {
          [Op.in]: bookedSeats,
        },
        status:Initiated
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    const checkedSeatsId = intiatedSeats.map((obj) => obj.id);
    await seats.update(
      { status: Booked },
      {
        where: {
          id: {
            [Op.in]: checkedSeatsId,
          },
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );

    await t.commit();
    return checkedSeatsId;
  } catch (error) {
    await t.rollback();
    console.log(error);
  }

}
 // const { Op } = require('sequelize');

async function checkingTerminatedSession() {

  const tenMinutesAgo = new Date(Date.now() - 10*  60 * 1000);

  const response = await seats.update(
    { status: 'UnBooked' },
    {
      where: {
        status: 'Initiated',
        updatedAt: {
          [Op.lt]: tenMinutesAgo
        }
      }
    }
  );

  return response;
}

module.exports = {
  initiateSeatBooking,
  confirmBooking,
  allSeats,
  checkingTerminatedSession
};
