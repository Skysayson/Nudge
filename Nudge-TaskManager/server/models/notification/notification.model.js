module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      notification_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message_type: {
        type: DataTypes.ENUM("task-update", "due-date", "reminder"),
        allowNull: false,
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      task_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "task_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "Notifications",
      timestamps: true,
    }
  );

  Notification.associate = function (models) {
    Notification.belongsTo(models.User, { foreignKey: "user_id" });
    Notification.belongsTo(models.Task, { foreignKey: "task_id" });
  };

  return Notification;
};
