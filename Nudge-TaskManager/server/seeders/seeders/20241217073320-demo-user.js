"use strict";

const bcrypt = require("bcrypt"); // Assuming passwords are hashed for security

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("defaultPassword123", 10); // Example password hashing

    await queryInterface.bulkInsert("Users", [
      {
        user_id: 1,
        username: "alice_johnson",
        email: "alice@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        username: "bob_smith",
        email: "bob@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        username: "charlie_brown",
        email: "charlie@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        username: "diana_prince",
        email: "diana@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        username: "eve_adams",
        email: "eve@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {}); // Deletes all records from Users table
  },
};
