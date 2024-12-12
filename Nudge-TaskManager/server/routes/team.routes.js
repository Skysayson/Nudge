const express = require("express");
const router = express.Router();

const {
  createTeam,
  getAllTeams,
  getTeamById,
  getMemberByTeamId,
} = require("../controllers/team.controller");

router.post("/create", createTeam);
router.get("/", getAllTeams);
router.get("/find/:team_id", getTeamById);
router.get("/find/members/:team_id", getMemberByTeamId);

module.exports = router;
