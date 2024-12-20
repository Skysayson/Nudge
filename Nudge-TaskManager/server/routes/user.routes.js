const express = require("express");
const authenticateToken = require("../middleware/jwtAuth.middleware"); //to be used later
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  findUserByEmail,
} = require("../controllers/user.controller");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/find/:user_id", getUserById, authenticateToken);
router.post("/find/email", findUserByEmail, authenticateToken);
router.put("/update/:user_id", updateUser);
router.delete("/delete/:user_id", deleteUser);

module.exports = router;
