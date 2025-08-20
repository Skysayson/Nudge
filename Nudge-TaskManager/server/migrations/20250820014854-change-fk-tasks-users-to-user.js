'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Find all existing FKs on tasks.admin_id that reference `users`
    const [rows] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'tasks'
        AND COLUMN_NAME = 'admin_id'
        AND REFERENCED_TABLE_NAME = 'users';
    `);

    // 2) Drop them all (you have many duplicates like tasks_ibfk_11, 13, 15, ...)
    for (const r of rows) {
      await queryInterface.sequelize.query(
        'ALTER TABLE `tasks` DROP FOREIGN KEY `' + r.CONSTRAINT_NAME + '`;'
      );
    }

    // 3) (Optional) ensure index exists on admin_id for performance
    await queryInterface.addIndex('tasks', ['admin_id'], {
      name: 'idx_tasks_admin_id',
    }).catch(() => { /* ignore if it already exists */ });

    // 4) Add a single FK pointing to `user(user_id)`
    //    Your schema shows admin_id allows NULL and used ON DELETE SET NULL
    await queryInterface.addConstraint('tasks', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'fk_tasks_admin_id_user',               // stable constraint name
      references: { table: 'user', field: 'user_id' }, // <-- singular lowercase
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove our new FK
    await queryInterface.removeConstraint('tasks', 'fk_tasks_admin_id_user');

    // Add it back pointing to `users(user_id)` (original, per your current table)
    await queryInterface.addConstraint('tasks', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'fk_tasks_admin_id_user',
      references: { table: 'users', field: 'user_id' }, // revert target
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
};
