"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Members", [
      {
        username: "Patrick Elalto",
        user_id: 5, // Assuming user with ID 1 exists
        team_id: 1, // Alpha Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Patrick Elalto",
        user_id: 5, // Assuming user with ID 2 exists
        team_id: 2, // Alpha Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Patrick Elalto",
        user_id: 5, // Assuming user with ID 3 exists
        team_id: 3, // Beta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Ean Velayo",
        user_id: 4, // Assuming user with ID 4 exists
        team_id: 3, // Gamma Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Patrick Elalto",
        user_id: 5, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Patrick Elalto",
        user_id: 5, // Assuming user with ID 5 exists
        team_id: 5, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Mary Modesto",
        user_id: 1, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Mary Modesto",
        user_id: 1, // Assuming user with ID 5 exists
        team_id: 1, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Mary Modesto",
        user_id: 1, // Assuming user with ID 5 exists
        team_id: 2, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Mary Modesto",
        user_id: 1, // Assuming user with ID 5 exists
        team_id: 3, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Jonaz Sayson",
        user_id: 2, // Assuming user with ID 5 exists
        team_id: 3, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Jonaz Sayson",
        user_id: 2, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Victorienne Tiu",
        user_id: 3, // Assuming user with ID 5 exists
        team_id: 5, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Victorienne Tiu",
        user_id: 3, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Ean Velayo",
        user_id: 4, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Ean Velayo",
        user_id: 4, // Assuming user with ID 5 exists
        team_id: 1, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Ean Velayo",
        user_id: 4, // Assuming user with ID 5 exists
        team_id: 2, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Members", null, {}); // Deletes all data from Members table
  },
};
