"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils");
const { seatNameEnum, statusEnum } = Enums;
const { Classic, Classic_Plus, Recliner, Prime } = seatNameEnum;
const { Booked, UnBooked, Initiated, Cancelled } = statusEnum;
module.exports = (sequelize, DataTypes) => {
  class seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seats.init(
    {
      hallId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seat_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [Cancelled, Initiated, Booked, UnBooked],
        default: UnBooked,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: [Classic, Classic_Plus, Prime, Recliner],
        defaultValue: Classic,
      },
    },
    {
      sequelize,
      modelName: "seats",
    },
  );
  return seats;
};
