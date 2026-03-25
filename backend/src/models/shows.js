"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shows.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hallNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "shows",
    },
  );
  return shows;
};
