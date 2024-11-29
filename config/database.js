const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cinema_banco",
  password: "020296",
  port: 5432,
});

module.exports = pool;
