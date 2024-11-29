const pool = require("../../config/database");

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM movies");
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
  return result.rows[0];
};

exports.create = async (movie) => {
  const { title, description, duration, genre, rating, release_date } = movie;
  const result = await pool.query(
    "INSERT INTO movies (title, description, duration, genre, rating, release_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, description, duration, genre, rating, release_date]
  );
  return result.rows[0];
};

exports.update = async (id, movie) => {
  const { title, description, duration, genre, rating, release_date } = movie;
  const result = await pool.query(
    "UPDATE movies SET title = $1, description = $2, duration = $3, genre = $4, rating = $5, release_date = $6 WHERE id = $7 RETURNING *",
    [title, description, duration, genre, rating, release_date, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM movies WHERE id = $1", [id]);
};
