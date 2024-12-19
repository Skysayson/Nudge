const express = require("express");
const authenticateToken = require("../middleware/jwtAuth.middleware"); //to be used later
const router = express.Router();
const {
  createNotification,
  getNotificationByUser,
  deleteNotification,
} = require("../controllers/notification.controller");

router.post("/create", createNotification);
router.get("/find/user/:user_id", getNotificationByUser);
router.delete("/delete/:notification_id", deleteNotification);

module.exports = router;
