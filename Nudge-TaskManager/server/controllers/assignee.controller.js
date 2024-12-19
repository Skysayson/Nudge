const { Assignee, User } = require("../models");

const createAssignee = async (req, res) => {
  try {
    const { task_id, user_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingAssignee = await Assignee.findOne({
      where: {
        task_id,
        user_id,
      },
    });

    if (existingAssignee) {
      return res
        .status(400)
        .json({ message: "User is already an assignee for this task" });
    }

    const assignee = await Assignee.create({
      task_id,
      user_id,
      username: user.username,
    });

    res.status(201).json(assignee);
  } catch (error) {
    console.error("Error creating assignee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Assignees for a task
const getAssigneesByTask = async (req, res) => {
  try {
    const { task_id } = req.params;

    // Fetch all assignees for the given task_id
    const assignees = await Assignee.findAll({ where: { task_id } });

    res.status(200).json(assignees);
  } catch (error) {
    console.error("Error fetching assignees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an Assignee
const deleteAssignee = async (req, res) => {
  try {
    const { assignee_id } = req.params;

    // Find and delete the assignee
    const assignee = await Assignee.findByPk(assignee_id);

    if (!assignee) {
      return res.status(404).json({ message: "Assignee not found" });
    }

    await assignee.destroy();
    res.status(200).json({ message: "Assignee deleted successfully" });
  } catch (error) {
    console.error("Error deleting assignee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAssignee,
  getAssigneesByTask,
  deleteAssignee,
};
