'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        taskID: 1,
        teamID: 1, // Alpha Team
        status: 'In Progress',
        priority: 'High',
        title: 'Set up database schema',
        content: 'Create tables for the project using Sequelize migrations and models.',
        assigned: JSON.stringify(['Alice Johnson', 'Bob Smith']), // Array serialized as JSON
        comments: JSON.stringify([
          { commentID: 1, author: 'Alice Johnson', text: 'Started working on migrations.' },
          { commentID: 2, author: 'Bob Smith', text: 'Ensure normalization is applied.' },
        ]),
        created: new Date(),
        due: new Date(new Date().setDate(new Date().getDate() + 7)), // Due in 7 days
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskID: 2,
        teamID: 1, // Alpha Team
        status: 'Pending',
        priority: 'Medium',
        title: 'Develop RESTful API',
        content: 'Build RESTful API endpoints for authentication and CRUD operations.',
        assigned: JSON.stringify(['Alice Johnson']),
        comments: JSON.stringify([
          { commentID: 1, author: 'Bob Smith', text: 'Review design specs before coding.' },
        ]),
        created: new Date(),
        due: new Date(new Date().setDate(new Date().getDate() + 14)), // Due in 14 days
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskID: 3,
        teamID: 2, // Beta Team
        status: 'Completed',
        priority: 'Low',
        title: 'Design landing page',
        content: 'Create a responsive landing page using Figma reference and Tailwind CSS.',
        assigned: JSON.stringify(['Charlie Brown']),
        comments: JSON.stringify([
          { commentID: 1, author: 'Charlie Brown', text: 'Landing page design finished.' },
          { commentID: 2, author: 'Alice Johnson', text: 'Looks great! Approved.' },
        ]),
        created: new Date(),
        due: new Date(new Date().setDate(new Date().getDate() - 1)), // Due yesterday (past)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
