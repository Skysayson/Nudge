module.exports = {
  HOST: process.env.DB_HOST || "127.0.0.1", // use IPv4 by default
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "1234",
  DB: process.env.DB_NAME || "Nudge",
  dialect: process.env.DB_DIALECT || "mysql",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
};
