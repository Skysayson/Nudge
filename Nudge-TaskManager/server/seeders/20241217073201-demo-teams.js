"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Teams", [
      {
        team_name: "Kayak",
        admin_name: "Mary Modesto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_name: "Boats",
        admin_name: "Victorienne Tiu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_name: "Wave",
        admin_name: "Jonaz Sayson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_name: "One Piece",
        admin_name: "Patrick Elalto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teams", null, {});
  },
};
