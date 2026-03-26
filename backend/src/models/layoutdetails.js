"use strict";
const { Model } = require("sequelize");
const {Enums} = require('../utils')
const {seatNameEnum} = Enums;
const {Classic,Classic_Plus,Recliner,Prime} = seatNameEnum

module.exports = (sequelize, DataTypes) => {
  class layoutDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.layoutPatterns,{
        foreignKey:'patternId',
        onDelete:'CASCADE'
      })
    }
  }
  layoutDetails.init(
    {
      patternId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      row: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      col: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "layoutDetails",
    },
  );
  return layoutDetails;
};
