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
      this.belongsTo(models.layoutPatterns, {
        foreignKey: "layoutPatternId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.seats, {
        foreignKey: "hallId",
        sourceKey: "hallNumber",
        onDelete: "CASCADE",
      });

      this.hasMany(models.shows, {
        foreignKey: "hallNo",
        targetKey: "hallNumber",
        onDelete: "CASCADE",
      });
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
