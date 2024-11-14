const express = require("express");
const db = require("./models");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // The origin of your React app
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("DB and TB are made now");
});

//IMPORT ROUTES
const userRoutes = require("./routes/user.routes");
const teamRoutes = require("./routes/team.routes");
const taskRoutes = require("./routes/task.routes");

//API
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
