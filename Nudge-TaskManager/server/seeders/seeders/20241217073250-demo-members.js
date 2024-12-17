'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        member_id: 1,
        username: 'alice_johnson',
        user_id: 1, // Assuming user with ID 1 exists
        team_id: 1, // Alpha Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        member_id: 2,
        username: 'bob_smith',
        user_id: 2, // Assuming user with ID 2 exists
        team_id: 1, // Alpha Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        member_id: 3,
        username: 'charlie_brown',
        user_id: 3, // Assuming user with ID 3 exists
        team_id: 2, // Beta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        member_id: 4,
        username: 'diana_prince',
        user_id: 4, // Assuming user with ID 4 exists
        team_id: 3, // Gamma Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        member_id: 5,
        username: 'eve_adams',
        user_id: 5, // Assuming user with ID 5 exists
        team_id: 4, // Delta Team
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {}); // Deletes all data from Members table
  },
};
