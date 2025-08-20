const { Team, Member, User, sequelize } = require("../models"); // ensure sequelize is imported
// If your models/index.js exports differently, adjust the require accordingly.

const createTeam = async (req, res) => {
  const { team_name, admin_name, user_id } = req.body;

  if (!team_name || !user_id) {
    return res.status(400).json({ error: "team_name and user_id are required" });
  }

  let t;
  try {
    t = await sequelize.transaction();

    const newTeam = await Team.create(
      { team_name, admin_name },
      { transaction: t }
    );

    // ensure we provide a username for the Member (Member.username is notNull)
    const user = await User.findOne({ where: { user_id } , transaction: t });
    const memberUsername = (user && user.username) ? user.username : (admin_name || "Unknown");

    await Member.create(
      {
        user_id: user_id,
        team_id: newTeam.team_id,
        username: memberUsername,
        role: "admin",
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({ message: "Team created", team: newTeam });
  } catch (err) {
    if (t) await t.rollback();
    console.error("createTeam error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (err) {
    console.error("getAllTeams error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamById = async (req, res) => {
  const { team_id } = req.params;
  try {
    const team = await Team.findOne({ where: { team_id } });
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (err) {
    console.error("getTeamById error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMemberByTeamId = async (req, res) => {
  const { team_id } = req.params;
  try {
    const members = await Member.findAll({
      where: { team_id },
      include: [{ model: User, attributes: ["user_id", "username", "email"] }],
    });
    res.json(members);
  } catch (err) {
    console.error("getMemberByTeamId error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  getMemberByTeamId,
};
