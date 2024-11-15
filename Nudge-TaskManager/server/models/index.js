const dbConfig = require("../configs/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

//HERE ARE MY MODELS
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

//HERE ARE MY CURRENT ASSOCIATIONS
//User - Member
User.hasMany(Member, { foreignKey: "user_id" });
Member.belongsTo(User, { foreignKey: "user_id", allowNull: true });

//Team - Member
Team.hasMany(Member, { foreignKey: "team_id" });
Member.belongsTo(Team, { foreignKey: "team_id", allowNull: false });

//Team - Task
Team.hasMany(Task, { foreignKey: "team_id" });
Task.belongsTo(Team, { foreignKey: "team_id", allowNull: false });

//User - Task
User.hasMany(Task, { foreignKey: "admin_id" });
Task.belongsTo(User, { foreignKey: "admin_id", allowNull: true });

//Task - Comment
Task.hasMany(Comment, { foreignKey: "task_id" });
Comment.belongsTo(Task, { foreignKey: "task_id", allowNull: false });

//User - Comment
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id", allowNull: false });

//Comment - Comment
Comment.hasMany(Comment, { foreignKey: "parent_comment_id", as: "replies" });
Comment.belongsTo(Comment, { foreignKey: "parent_comment_id", as: "parent" });

const db = {
  sequelize,
  Sequelize,
  User,
  Member,
  Task,
  Team,
  Notification,
  Comment,
};

module.exports = db;
