const QueueRepository = require("../repositories/queue");
const TicketsRepository = require("../repositories/tickets");

exports.addToQueue = async (req, res) => {
  const { session_id, user_id } = req.body;

  try {
    const newQueueEntry = await QueueRepository.addToQueue({
      session_id,
      user_id,
    });

    res.status(201).json(newQueueEntry);
  } catch (error) {
    console.error("Erro ao adicionar à fila:", error);
    res.status(500).json({ error: "Erro ao adicionar à fila." });
  }
};

exports.processQueue = async (req, res) => {
  const { session_id } = req.body;

  try {
    const nextInQueue = await QueueRepository.getNextInQueue(session_id);
    if (!nextInQueue) {
      return res
        .status(404)
        .json({ error: "Nenhum usuário na fila para essa sessão." });
    }

    const availableSeat = await TicketsModel.getAvailableSeat(session_id);
    if (!availableSeat) {
      return res
        .status(400)
        .json({ error: "Nenhum assento disponível para essa sessão." });
    }

    const updatedTicket = await TicketsModel.reserveTicket({
      ticket_id: availableSeat.id,
      user_id: nextInQueue.user_id,
    });

    await QueueRepository.updateQueueStatus(nextInQueue.id, "completed");

    res.status(200).json({
      message: "Compra processada com sucesso!",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Erro ao processar fila:", error);
    res.status(500).json({ error: "Erro ao processar fila." });
  }
};

exports.getQueue = async (req, res) => {
  const { session_id } = req.params;

  try {
    const queue = await QueueRepository.getQueueBySession(session_id);
    res.status(200).json(queue);
  } catch (error) {
    console.error("Erro ao listar fila:", error);
    res.status(500).json({ error: "Erro ao listar fila." });
  }
};

exports.getProcessedQueue = async (req, res) => {
  const { session_id } = req.params;

  try {
    const processedQueue = await QueueRepository.getProcessedQueueBySession(
      session_id
    );
    res.status(200).json(processedQueue);
  } catch (error) {
    console.error("Erro ao listar fila processada:", error);
    res.status(500).json({ error: "Erro ao listar fila processada." });
  }
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
