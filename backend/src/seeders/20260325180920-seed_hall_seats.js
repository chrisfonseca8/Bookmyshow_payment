"use strict";

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
    //   await queryInterface.bulkInsert("halls",[ {
    //     hallNumber: 1,
    //     layoutPatternId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }

    // ]);

    const layoutDetails = await queryInterface.sequelize.query(
      `SELECT* FROM layoutdetails WHERE patternId=1`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const hallId = 1;

    const seats = layoutDetails.map((obj) => ({
      hallId: hallId,
      seat_number: obj.row + "" + obj.col,
      price: obj.price,
      type: obj.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

  //  console.log(seats);

  await queryInterface.bulkInsert('seats',seats);
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
