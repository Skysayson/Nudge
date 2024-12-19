const { Notification, Task, User } = require("../models");

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

    const notification = await Notification.create({
      message,
      message_type,
      task_id,
      user_id, // Retrieve the username from the User model
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotificationByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const notification = await Notification.findAll({ where: { user_id } });

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;

    const notification = await Notification.findByPk(notification_id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.destroy();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNotification,
  getNotificationByUser,
  deleteNotification,
};
