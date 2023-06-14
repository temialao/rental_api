module.exports = {
  client: "sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  migrations: {
    directory: "./database/migrations",
  },
};
