"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("TB_PRODUCTS", "modelId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "TB_MODELS",
        key: "id",
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn("TB_PRODUCTS", "modelId");
  },
};
