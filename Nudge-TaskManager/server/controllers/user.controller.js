const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt.util");

//TO BE USED FOR REGISTRATION
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully...", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user...", error });
  }
};

//TO BE USED FOR LOGGING IN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log("Checking credentials for:", email);

    if (!user) {
      return res.status(400).json({ message: "User does not exist..." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password..." });
    } else {
      const jwtToken = generateToken(user);

      return res.json({ token: jwtToken });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Uh Oh, Something went wrong...",
      error: error.message || error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User DNE" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.body; // Retrieve email from query string

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Fetch user based on the email
    const user = await User.findOne({ where: { email } });

    // Handle case where user does not exist
    if (!user) {
      return res.status(404).json({ message: "User DNE" });
    }

    // Return the user if found
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  findUserByEmail,
};
