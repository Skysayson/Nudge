const jwt = require("jsonwebtoken");
const secretKey = "NudgeSecretKey";

const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.email }, secretKey, {
    expiresIn: "24h",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };
