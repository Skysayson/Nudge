// migrations/XXXXXXXXXXXX-drop-users-fk-add-`user`-fk.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Find any FKs on Members.user_id that reference `users`
    const [rows] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'members'
        AND COLUMN_NAME = 'user_id'
        AND REFERENCED_TABLE_NAME = 'users';
    `);

    // 2) Drop each FK found (covers members_ibfk_9 etc.)
    for (const r of rows) {
      await queryInterface.sequelize.query(
        'ALTER TABLE `members` DROP FOREIGN KEY `' + r.CONSTRAINT_NAME + '`;'
      );
    }

    // 3) Re-add FK pointing to `user(user_id)`
    await queryInterface.addConstraint('members', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_members_user_id',           // stable, friendly name
      references: { table: 'user', field: 'user_id' }, // <-- singular
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove our new FK
    await queryInterface.removeConstraint('members', 'fk_members_user_id');

    // Re-add FK pointing back to `users(user_id)`
    await queryInterface.addConstraint('members', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_members_user_id',
      references: { table: 'users', field: 'user_id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
