const pool = require("../../config/database");

exports.addToQueue = async ({ session_id, user_id }) => {
  const result = await pool.query(
    "INSERT INTO queue (session_id, user_id) VALUES ($1, $2) RETURNING *",
    [session_id, user_id]
  );
  return result.rows[0];
};

exports.getNextInQueue = async (session_id) => {
  const result = await pool.query(
    `SELECT * FROM queue
       WHERE session_id = $1 AND status = 'waiting'
       ORDER BY created_at ASC
       LIMIT 1`,
    [session_id]
  );
  return result.rows[0];
};

exports.updateQueueStatus = async (id, status) => {
  await pool.query(`UPDATE queue SET status = $1 WHERE id = $2`, [status, id]);
};

exports.getQueueBySession = async (session_id) => {
  const result = await pool.query(
    `SELECT * FROM queue
       WHERE session_id = $1 AND status = 'waiting'
       ORDER BY created_at ASC`,
    [session_id]
  );
  return result.rows;
};

exports.getProcessedQueueBySession = async (session_id) => {
  const result = await pool.query(
    `SELECT * FROM queue
     WHERE session_id = $1 AND status IN ('completed', 'processing')
     ORDER BY created_at ASC`,
    [session_id]
  );
  return result.rows;
};

exports.clearQueueBySession = async (session_id) => {
  const result = await pool.query(
    `DELETE FROM queue
     WHERE session_id = $1`,
    [session_id]
  );
  return result;
};
