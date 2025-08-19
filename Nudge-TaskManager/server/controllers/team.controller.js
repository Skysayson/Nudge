const { Team, Member } = require("../models");

const createTeam = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { team_name, admin_name, user_id: bodyUserId } = req.body;

    // Prefer JWT user if you have auth middleware; fall back to body
    const creatorUserId = req.user?.user_id || bodyUserId;
    if (!creatorUserId) {
      await t.rollback();
      return res.status(400).json({ message: "user_id is required" });
    }
    if (!team_name?.trim()) {
      await t.rollback();
      return res.status(400).json({ message: "team_name is required" });
    }

    const team = await Team.create(
      { team_name: team_name.trim(), admin_name: admin_name || null },
      { transaction: t }
    );

    await Member.create(
      {
        team_id: team.team_id,
        user_id: creatorUserId,
        role: "admin",
      },
      { transaction: t }
    );

    await t.commit();
    return res
      .status(201)
      .json({ message: "Team created successfully", team });
  } catch (error) {
    await t.rollback();
    console.error("createTeam error:", error);
    return res
      .status(500)
      .json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { team_id } = req.params;
    const team = await Team.findOne({ where: { team_id } });

    if (!team) {
      return res.status(404).json({ message: "Team DNE" });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getMemberByTeamId = async (req, res) => {
  try {
    const { team_id } = req.params;
    const team = await Member.findAll({ where: { team_id } });

    if (!team || team.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for this team." });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  getMemberByTeamId,
};
