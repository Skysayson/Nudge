const express = require("express");
const authenticateToken = require("../middleware/jwtAuth.middleware"); //to be used later
const router = express.Router();
const {
  addMember,
  findAllMembers,
  findMembersByUserId,
  findMembersByTeamId,
} = require("../controllers/member.controller");

router.post("/create", addMember);
router.get("/", findAllMembers);
router.get("/find/user/:user_id", findMembersByUserId);
router.get("/find/members/:team_id", findMembersByTeamId);

module.exports = router;
