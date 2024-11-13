const { Task } = require("../models");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      priority,
      status,
      team_id,
      admin_id,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      due_date,
      priority,
      status,
      team_id,
      admin_id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getTasksByTeam = async (req, res) => {
  try {
    const { team_id } = req.params;

    const tasks = await Task.findAll({
      where: { team_id },
    });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this team" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

const getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.params;

    const tasks = await Task.findAll({
      where: { priority },
    });

    if (!tasks.length) {
      return res
        .status(404)
        .json({ message: "No tasks in this level of priority" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uh oh, something went wrong!!!", error });
  }
};

module.exports = {
  createTask,
  getTasksByTeam,
  getAllTasks,
  getTasksByPriority,
};