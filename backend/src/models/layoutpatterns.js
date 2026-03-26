"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class layoutPatterns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.layoutDetails, {
        foreignKey: "patternId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Hall,{
        foreignKey:'layoutPatternId',
        onDelete:'CASCADE'
      })
    }
  }
  layoutPatterns.init(
    {
      rowNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      patterName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "layoutPatterns",
    },
  );
  return layoutPatterns;
};
