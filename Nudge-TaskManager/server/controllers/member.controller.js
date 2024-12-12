const { Member, User, Team } = require("../models");

const addMember = async (req, res) => {
  try {
    const { user_id, team_id } = req.body;

    const temp = await User.findOne({ where: { user_id } });
    const username = temp.username;

    const member = await Member.create({
      user_id,
      team_id,
      username,
    });

    res.status(201).json({ message: "Member created successfully...", member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating member...", error });
  }
};

const findAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving members", error });
  }
};

const findMembersByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const members = await Member.findAll({
      where: { user_id },
      include: [
        {
          model: Team, // Assuming there is an associated Team model
          attributes: ["team_name"], // Only retrieve the team name or any other relevant fields
        },
      ],
    });

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for this user_id." });
    }

    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving members by user_id.", error });
  }
};

const findMembersByTeamId = async (req, res) => {
  try {
    const { team_id } = req.params;

    const members = await Member.findAll({
      where: { team_id },
    });

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for this team_id." });
    }

    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving members by team_id.", error });
  }
};

module.exports = {
  addMember,
  findAllMembers,
  findMembersByUserId,
  findMembersByTeamId,
};
