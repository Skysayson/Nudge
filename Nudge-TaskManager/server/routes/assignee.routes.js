const express = require("express");
const authenticateToken = require("../middleware/jwtAuth.middleware"); //to be used later
const router = express.Router();
const {
  createAssignee,
  getAssigneesByTask,
  deleteAssignee,
} = require("../controllers/assignee.controller");

router.post("/create", createAssignee);
router.get("/find/task/:task_id", getAssigneesByTask);
router.delete("/delete/:assignee_id", deleteAssignee);

module.exports = router;
