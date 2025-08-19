// routes/team.routes.js
const express = require("express");
const router = express.Router();
const { createTeam, getAllTeams, getTeamById, getMemberByTeamId } = require("../controllers/team.controller");
const authenticateToken = require("../middleware/jwtAuth.middleware"); // if you have it

// If you have auth middleware:
router.post("/create", authenticateToken, createTeam);

// If you DON'T have auth middleware yet, use this instead:
// router.post("/create", createTeam);

router.get("/", getAllTeams);
router.get("/find/:team_id", getTeamById);
router.get("/find/members/:team_id", getMemberByTeamId);

module.exports = router;
