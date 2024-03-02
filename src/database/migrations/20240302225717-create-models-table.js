"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("TB_MODELS", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TB_BRANDS",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTrable("TB_MODELS");
  },
};
