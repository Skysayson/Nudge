const express = require("express");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // (optional) if you use JWT
  })
);

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
