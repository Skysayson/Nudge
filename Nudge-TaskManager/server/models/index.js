const dbConfig = require("../configs/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

//MODELS HERE
const User = require("./user/user.model.js")(sequelize, DataTypes);
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

//ASSOCIATIONS (TO BE ADDED FRFR)

const db = {
  sequelize,
  Sequelize,
  User,
  Task,
  Team,
  Notification,
  Comment,
};

module.exports = db;
