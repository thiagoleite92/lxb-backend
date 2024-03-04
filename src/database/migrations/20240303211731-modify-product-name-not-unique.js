"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.removeColumn("TB_PRODUCTS", "name");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("TB_PRODUCTS", "name", {
      type: Sequelize.STRING,
      unique: false,
    });
  },
};
