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
      //foreign key
      task_id: {
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      //foreign key
      user_id: {
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      //foreign key
      parent_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "Comments",
      timestamps: true,
    }
  );

  return Comment;
};
