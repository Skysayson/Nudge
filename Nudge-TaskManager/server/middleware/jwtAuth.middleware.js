const { verifyToken } = require("../utils/jwt.util");

const { verifyToken } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
  const myToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!myToken) {
    return res.status(403).json({ message: "Token DNE..." });
  }

  try {
    const decoded = verifyToken(myToken);
    req.user = decoded;
    //MARY CODE NOTE: the next proceeds to the next thing (route, etc.)
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Either invalid or expired token..." });
  }
};

module.exports = authenticateToken;
