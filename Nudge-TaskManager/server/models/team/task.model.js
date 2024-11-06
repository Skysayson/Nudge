module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("high", "medium", "low"),
      defaultValue: "low",
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users", // FOREIGN KEY
        key: "user_id",
      },
    },
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // FOREIGN KEY
        key: "user_id",
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Teams", // FOREIGN KEY
        key: "team_id",
      },
    },
  });

  return Task;
};
