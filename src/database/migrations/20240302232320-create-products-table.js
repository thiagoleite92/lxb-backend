"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("TB_PRODUCTS", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TB_COLORS",
          key: "id",
        },
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
    return queryInterface.dropTable("TB_PRODUCTS");
  },
};
