const { Notification, Task, User } = require("../models");
const { get } = require("../routes/assignee.routes");

// Create a new Assignee
const createNotification = async (req, res) => {
  try {
    const { message, message_type, task_id, user_id } = req.body;

    // Find the username from the User model
    const user = await User.findByPk(user_id);
    const task = await Task.findByPk(task_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Create the assignee record
    const notification = await Notification.create({
      message,
      message_type,
      task_id,
      user_id, // Retrieve the username from the User model
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating assignee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Assignees for a task
const getNotificationByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Fetch all assignees for the given task_id
    const notification = await Notification.findAll({ where: { user_id } });

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notifications:", error);
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
  createNotification,
  getNotificationByUser,
};
