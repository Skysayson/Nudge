const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByTeam,
  getAllTasks,
  getTasksByPriority,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.post("/create", createTask);
router.get("/", getAllTasks);
router.get("/find/team/:team_id", getTasksByTeam);
router.get("/find/priority/:priority", getTasksByPriority);
router.put("/update/:task_id", updateTask);
router.delete("/delete/:task_id", deleteTask);

module.exports = router;
