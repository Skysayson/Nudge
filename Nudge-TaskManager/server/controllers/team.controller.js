const { Team, Member } = require("../models");

const createTeam = async (req, res) => {
  try {
    const { team_name, admin_name } = req.body;

    const team = await Team.create({
      team_name,
      admin_name,
    });

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
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
