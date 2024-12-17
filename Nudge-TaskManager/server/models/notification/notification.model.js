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
        allowNull: true,
      },
      message_type: {
        type: DataTypes.ENUM("task-update", "due-date", "reminder"),
        allowNull: false,
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      //foreign key
      task_id: {
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      //foreign key
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Notifications",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Notification.beforeCreate((notification, options) => {
    notification.sent_at = new Date();
  });

  return Notification;
};
