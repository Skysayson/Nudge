module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
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
      tableName: "Comments",
      timestamps: true,
    }
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "user_id" });
    Comment.belongsTo(models.Task, { foreignKey: "task_id" });
  };

  return Comment;
};
