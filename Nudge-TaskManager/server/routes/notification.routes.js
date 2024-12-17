const express = require("express");
const authenticateToken = require("../middleware/jwtAuth.middleware"); //to be used later
const router = express.Router();
const {
  createNotification,
  getNotificationByUser,
} = require("../controllers/notification.controller");

router.post("/create", createNotification);
router.get("/find/user/:user_id", getNotificationByUser);

module.exports = router;
