module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    member_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    username:  { type: DataTypes.STRING, allowNull: false },
    user_id:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // FK → User.user_id
    team_id:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },  // FK → Teams.team_id (if any)
  }, {
    tableName: 'Members',   // be explicit to match your actual table
    timestamps: true,
    freezeTableName: true,
  });

  Member.associate = (models) => {
    Member.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    // If you have Teams model:
    // Member.belongsTo(models.Team, { foreignKey: 'team_id', targetKey: 'team_id' });
  };

  return Member;
};
