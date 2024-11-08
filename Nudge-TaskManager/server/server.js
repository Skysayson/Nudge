const express = require("express");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

db.sequelize.sync({ force: true }).then(() => {
  console.log("DB and TB are made now");
});

//ROUTES (TO BE ADDED FRFR)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
