const pool = require("../../config/database");

exports.getAll = async () => {
  const result = await pool.query(` 
    SELECT sessions.*, movies.title AS movie_title, rooms.name AS room_name
    FROM sessions
    JOIN movies ON sessions.movie_id = movies.id
    JOIN rooms ON sessions.room_id = rooms.id`);
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT sessions.*, movies.title AS movie_title, rooms.name AS room_name
     FROM sessions
     JOIN movies ON sessions.movie_id = movies.id
     JOIN rooms ON sessions.room_id = rooms.id
     WHERE sessions.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async (session) => {
  const { movie_id, room_id, session_time } = session;
  const result = await pool.query(
    "INSERT INTO sessions (movie_id, room_id, session_time) VALUES ($1, $2, $3) RETURNING *",
    [movie_id, room_id, session_time]
  );
  return result.rows[0];
};

exports.update = async (id, session) => {
  const { movie_id, room_id, session_time } = session;
  const result = await pool.query(
    "UPDATE sessions SET movie_id = $1, room_id = $2, session_time = $3 WHERE id = $4 RETURNING *",
    [movie_id, room_id, session_time, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM sessions where ID = $1", [id]);
};

exports.getRoomCapacity = async (room_id) => {
  const result = await pool.query(`SELECT capacity FROM rooms WHERE id = $1`, [
    room_id,
  ]);
  return result.rows[0]?.capacity || 0;
};
