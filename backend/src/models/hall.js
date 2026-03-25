"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hall.init(
    {
      hallNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      layoutPatternId: {
        type: DataTypes.INTEGER,
                allowNull: false,

      },
    },
    {
      sequelize,
      modelName: "Hall",
    },
  );
  return Hall;
};
