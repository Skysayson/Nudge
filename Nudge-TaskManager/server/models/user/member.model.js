module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    member_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //foreign key
    user_id: {
      type: DataTypes.INTEGER,
    },
    //foreign key
    team_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Member;
};
