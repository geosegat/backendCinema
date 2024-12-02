const { cinemaQueue } = require("../queue");
const QueueRepository = require("../repositories/queue");

exports.addToQueue = async (req, res) => {
  const ticket = cinemaQueue.getMyNumber();
  const position = cinemaQueue.getDistance(ticket);
  res.json({ ticketNumber: ticket, position });
};

exports.getMyPosition = async (req, res) => {
  const { ticketNumber } = req.query;

  const position = cinemaQueue.getDistance(Number(ticketNumber));
  res.json({
    personAhead: position,
  });
};

exports.processQueue = async (req, res) => {
  cinemaQueue.callNext();
  res.json({
    ok: true,
  });
};

exports.clearQueue = async (req, res) => {
  const { session_id } = req.params;

  try {
    const result = await QueueRepository.clearQueueBySession(session_id);

    res.status(200).json({
      message: "Fila limpa com sucesso!",
      session_id: parseInt(session_id, 10),
      deleted_rows: result.rowCount,
    });
  } catch (error) {
    console.error("Erro ao limpar a fila:", error);
    res.status(500).json({ error: "Erro ao limpar a fila." });
  }
};
