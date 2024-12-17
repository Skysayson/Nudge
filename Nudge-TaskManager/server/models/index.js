const dbConfig = require("../configs/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// HERE ARE YOUR MODELS
const User = require("./user/user.model.js")(sequelize, DataTypes);
const Member = require("./user/member.model.js")(sequelize, DataTypes);
const Task = require("./team/task.model.js")(sequelize, DataTypes);
const Team = require("./team/team.model.js")(sequelize, DataTypes);
const Notification = require("./notification/notification.model.js")(
  sequelize,
  DataTypes
);
const Comment = require("./notification/comment.model.js")(
  sequelize,
  DataTypes
);
const Assignee = require("./user/assignee.model.js")(sequelize, DataTypes); // New Assignee model

// HERE ARE YOUR CURRENT ASSOCIATIONS

// User - Member
User.hasMany(Member, { foreignKey: "user_id" });
Member.belongsTo(User, { foreignKey: "user_id", allowNull: true });

// Team - Member
Team.hasMany(Member, { foreignKey: "team_id" });
Member.belongsTo(Team, { foreignKey: "team_id", allowNull: false });

// Team - Task
Team.hasMany(Task, { foreignKey: "team_id" });
Task.belongsTo(Team, { foreignKey: "team_id", allowNull: false });

// User - Task
User.hasMany(Task, { foreignKey: "admin_id" });
Task.belongsTo(User, { foreignKey: "admin_id", allowNull: true });

// Task - Comment
Task.hasMany(Comment, { foreignKey: "task_id" });
Comment.belongsTo(Task, { foreignKey: "task_id", allowNull: false });

// User - Comment
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id", allowNull: false });

// Comment - Comment (Replies)
Comment.hasMany(Comment, { foreignKey: "parent_comment_id", as: "replies" });
Comment.belongsTo(Comment, { foreignKey: "parent_comment_id", as: "parent" });

// NEW ASSOCIATIONS FOR ASSIGNEE

// Task - Assignee
Task.hasMany(Assignee, { foreignKey: "task_id" });
Assignee.belongsTo(Task, { foreignKey: "task_id", allowNull: false });

// User - Assignee
User.hasMany(Assignee, { foreignKey: "user_id" });
Assignee.belongsTo(User, { foreignKey: "user_id", allowNull: false });

const db = {
  sequelize,
  Sequelize,
  User,
  Member,
  Task,
  Team,
  Notification,
  Comment,
  Assignee, // Include the new Assignee model in the db object
};

module.exports = db;
