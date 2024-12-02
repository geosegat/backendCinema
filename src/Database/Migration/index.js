const { Pool } = require("pg");

/**
 *
 * @param {Pool} pool
 */

exports.RunMigration = async (pool) => {
  await pool.query(`CREATE TABLE IF NOT EXISTS teste (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50)
    )`);
};
