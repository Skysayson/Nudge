const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  getCommentByTaskId,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

router.post("/create", createComment);
router.get("/", getAllComments);
router.get("/find/task/:task_id", getCommentByTaskId);
router.put("/update/:comment_id", updateComment);
router.delete("/delete/:comment_id", deleteComment);

module.exports = router;
