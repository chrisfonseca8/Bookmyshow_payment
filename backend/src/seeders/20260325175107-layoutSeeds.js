"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utils");
const { seatNameEnum, statusEnum } = Enums;
const { Classic, Classic_Plus, Recliner, Prime } = seatNameEnum;
const { Booked, UnBooked, Initiated, Cancelled } = statusEnum;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // 1. Insert ONE layout pattern
        // 1. Insert ONE layout pattern
    await queryInterface.bulkInsert("layoutPatterns", [
      {
        id: 1,
        rowNum: 10,
        colNum: 10,
        patterName: "Default 10x10 Layout",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 2. Insert layout details
    const details = [];

    const rows = ['A','B','C','D','E','F','G','H','I','J'];

    for (let i = 0; i < rows.length; i++) {
      for (let col = 1; col <= 10; col++) {

        let type = Classic;
        let price = 300;

        // zoning logic
        if (i >= 7) {
          type = Prime;
          price = 500;
        } else if (i >= 4) {
          type = Classic_Plus;
          price = 400;
        }

        details.push({
          patternId: 1,
          row: rows[i],
          col: col,
          price: price,
          type: type,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("layoutDetails", details);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
