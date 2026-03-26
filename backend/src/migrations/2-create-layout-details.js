"use strict";
/** @type {import('sequelize-cli').Migration} */
const {Enums} = require('../utils');
const {seatNameEnum} = Enums;
const {Classic,Classic_Plus,Recliner,Prime} = seatNameEnum
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("layoutDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patternId: {
        type: Sequelize.INTEGER,
        references:{
          model:'layoutPatterns',
          key:'id'
        },
         onDelete: 'CASCADE',
        allowNull: false,
      },
      row: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      col: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values:[Classic,Classic_Plus,Prime,Recliner],
        defaultValue:Classic
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("layoutDetails");
  },
};
