'use strict';

/** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up (queryInterface, Sequelize) {
        await queryInterface.addIndex('Members', ['user_id'], { name: 'idx_members_user_id' });
        await queryInterface.addConstraint('Members', {
          fields: ['user_id'],
          type: 'foreign key',
          name: 'fk_members_user_id',
          references: { table: 'User', field: 'user_id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      },
      async down (queryInterface) {
        await queryInterface.removeConstraint('Members', 'fk_members_user_id');
        await queryInterface.removeIndex('Members', 'idx_members_user_id');
      }
    };

