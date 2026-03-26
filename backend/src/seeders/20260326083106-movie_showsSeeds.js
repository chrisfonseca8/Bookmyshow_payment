"use strict";

const { DATE } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
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
    //movie seed
    // await queryInterface.bulkInsert("movies", [
    //   {
    //     name: "Inception",
    //     adult: false,
    //     price: 250,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);

    //show seed
    await queryInterface.bulkInsert("shows", [
      {
        movieId: 1,
        hallNo: 1,
        startTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
