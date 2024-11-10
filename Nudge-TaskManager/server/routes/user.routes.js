const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/find/:user_id", getUserById);
router.put("/update/:user_id", updateUser);
router.delete("/delete/:user_id", deleteUser);

module.exports = router;
