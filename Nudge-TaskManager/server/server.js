require('dotenv').config();

const express = require("express");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  FRONTEND_URL, 
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // enable preflight for all routes

// Remove sync({ alter: true }) completely
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("DB and TB are made now");
// });

// IMPORT ROUTES
const userRoutes = require("./routes/user.routes");
const teamRoutes = require("./routes/team.routes");
const taskRoutes = require("./routes/task.routes");
const memberRoutes = require("./routes/member.routes");
const commentRoutes = require("./routes/comment.routes");
const assigneeRoutes = require("./routes/assignee.routes");
const notificationRoutes = require("./routes/notification.routes");

// API
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/assignee", assigneeRoutes);
app.use("/api/notification", notificationRoutes);

// Start only after confirming DB connection
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("DB connection OK");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
})();
