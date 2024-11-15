const express = require("express");
const router = express.Router();

const {
  createTeam,
  getAllTeams,
  getTeamById,
} = require("../controllers/team.controller");

router.post("/create", createTeam);
router.get("/", getAllTeams);
router.get("/find/:team_id", getTeamById);

module.exports = router;
