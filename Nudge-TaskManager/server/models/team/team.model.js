module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      team_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "Teams",
      timestamps: true,
    }
  );

  Team.associate = function (models) {
    Team.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Team;
};
