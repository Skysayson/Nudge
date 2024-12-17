'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teams', [
      {
        team_id: 1,
        team_name: 'Alpha Team',
        admin_name: 'Alice Johnson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_id: 2,
        team_name: 'Beta Team',
        admin_name: 'Bob Smith',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_id: 3,
        team_name: 'Gamma Team',
        admin_name: 'Charlie Brown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        team_id: 4,
        team_name: 'Delta Team',
        admin_name: 'Diana Prince',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
