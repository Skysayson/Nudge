module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      team_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Teams",
      timestamps: true,
    }
  );

  return Team;
};
