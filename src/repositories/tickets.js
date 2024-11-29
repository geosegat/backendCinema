const pool = require("../../config/database");

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM tickets");
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
  return result.rows[0];
};

exports.create = async (ticket) => {
  const { session_id, seat_number, price, user_id } = ticket;
  const result = await pool.query(
    "INSERT INTO tickets (session_id, seat_number, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [session_id, seat_number, price, user_id]
  );
  return result.rows[0];
};

exports.update = async (id, ticket) => {
  const { session_id, seat_number, price, user_id } = ticket;
  const result = await pool.query(
    "UPDATE tickets SET session_id = $1, seat_number = $2, price = $3, user_id = $4 WHERE id = $5 RETURNING *",
    [session_id, seat_number, price, user_id, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
};

exports.createTicket = async ({ session_id, seat_number, price, user_id }) => {
  const result = await pool.query(
    `INSERT INTO tickets (session_id, seat_number, price, user_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [session_id, seat_number, price, user_id]
  );
  return result.rows[0];
};

exports.getAvailableSeat = async (session_id) => {
  const result = await pool.query(
    `SELECT * FROM tickets
     WHERE session_id = $1 AND user_id IS NULL
     ORDER BY seat_number ASC
     LIMIT 1`,
    [session_id]
  );
  return result.rows[0];
};

exports.reserveTicket = async ({ ticket_id, user_id }) => {
  const result = await pool.query(
    `UPDATE tickets
     SET user_id = $1
     WHERE id = $2
     RETURNING *`,
    [user_id, ticket_id]
  );
  return result.rows[0];
};

exports.getTicketsBySession = async (session_id) => {
  const result = await pool.query(
    `SELECT id, seat_number, user_id, price, created_at
     FROM tickets
     WHERE session_id = $1
     ORDER BY seat_number ASC`,
    [session_id]
  );
  return result.rows;
};
