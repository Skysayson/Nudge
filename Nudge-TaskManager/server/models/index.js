const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/db.config");

let sequelize;

if (process.env.DATABASE_URL) {
  // use a single connection string from the host (Railway / Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: dbConfig.dialect || "mysql",
    logging: false,
    dialectOptions: {
      // uncomment if your DB provider requires SSL
      // ssl: { require: true, rejectUnauthorized: false }
    },
  });
} else {
  // fall back to explicit env vars or config defaults
  sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    }
  );
}

// HERE ARE YOUR MODELS
const User = require("./user/user.model.js")(sequelize, Sequelize.DataTypes);
const Member = require("./user/member.model.js")(sequelize, Sequelize.DataTypes);
const Task = require("./team/task.model.js")(sequelize, Sequelize.DataTypes);
const Team = require("./team/team.model.js")(sequelize, Sequelize.DataTypes);
const Notification = require("./notification/notification.model.js")(
  sequelize,
  Sequelize.DataTypes
);
const Comment = require("./notification/comment.model.js")(
  sequelize,
  Sequelize.DataTypes
);
const Assignee = require("./user/assignee.model.js")(sequelize, Sequelize.DataTypes); // New Assignee model

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
