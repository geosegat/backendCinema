const pool = require("../../config/database");

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
  return result.rows[0];
};

exports.create = async (room) => {
  const { name, capacity, type } = room;
  const result = await pool.query(
    "INSERT INTO rooms (name, capacity, type) VALUES ($1, $2, $3) RETURNING *",
    [name, capacity, type]
  );
  return result.rows[0];
};

exports.update = async (id, room) => {
  const { name, capacity, type } = room;
  const result = await pool.query(
    "UPDATE rooms SET name = $1, capacity = $2, type = $3 WHERE id = $4 RETURNING *",
    [name, capacity, type, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
};
