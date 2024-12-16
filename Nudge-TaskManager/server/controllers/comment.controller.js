const { Comment } = require("../models");

const createComment = async (req, res) => {
  try {
    const { content, task_id, user_id } = req.body;

    // Check required fields
    if (!content || !task_id || !user_id) {
      return res
        .status(400)
        .json({ error: "Content, task_id, and user_id are required." });
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      task_id,
      user_id,
      created_at: new Date(),
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment." });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};

// Get a single comment by ID
const getCommentByTaskId = async (req, res) => {
  try {
    const { task_id } = req.params;

    const comment = await Comment.findAll({ where: { task_id } });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Failed to fetch comment." });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { content } = req.body;

    // Check if content is provided
    if (!content) {
      return res.status(400).json({ error: "Content is required." });
    }

    const comment = await Comment.findByPk(comment_id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Update the comment
    comment.content = content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment." });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const comment = await Comment.findByPk(comment_id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Delete the comment
    await comment.destroy();
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment." });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentByTaskId,
  updateComment,
  deleteComment,
};
