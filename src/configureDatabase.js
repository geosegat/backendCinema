const { Pool } = require("pg");
const { RunMigration } = require("./Database/Migration");

exports.ConfigureDataBase = async function ConfigureDataBase() {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cinema_banco",
    password: "020296",
    port: 5432,
  });
  await RunMigration(pool);
  return pool;
};
