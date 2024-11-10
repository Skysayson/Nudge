module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
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
        validate: {
          isAfter: {
            args: new Date().toISOString(), //read more on this later... but basically ensures future dates
            msg: "Due date must be in the future.",
          },
        },
      },
      priority: {
        type: DataTypes.ENUM("high", "medium", "low"),
        defaultValue: "low",
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending",
      },
      //foreign key
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      //foreign key
      team_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Tasks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Task;
};
