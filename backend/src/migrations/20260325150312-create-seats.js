"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utils");
const { seatNameEnum, statusEnum } = Enums;
const { Classic, Classic_Plus, Recliner, Prime } = seatNameEnum;
const { Booked, UnBooked, Initiated, Cancelled } = statusEnum;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hallId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "halls", 
          key: "hallNumber", 
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      seat_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: [Cancelled, Initiated, Booked, UnBooked],
        default: UnBooked,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
        values: [Classic, Classic_Plus, Prime, Recliner],
        defaultValue: Classic,
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
    await queryInterface.dropTable("seats");
  },
};
