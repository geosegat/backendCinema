const SessionModel = require("../repositories/sessions");
const TicketsModel = require("../repositories/tickets");

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await SessionModel.getAll();
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    res.stats(500).json({ error: "Erro ao buscar sessoes" });
  }
};

exports.getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await SessionModel.getById(id);
    if (!session) {
      return res.status(404).json({ error: "Sessão não encontrada." });
    }

    const tickets = await TicketsModel.getTicketsBySession(id);

    res.status(200).json({
      ...session,
      tickets,
    });
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    res.status(500).json({ error: "Erro ao buscar sessão." });
  }
};

exports.createSession = async (req, res) => {
  const { movie_id, room_id, session_time } = req.body;

  try {
    const newSession = await SessionModel.create({
      movie_id,
      room_id,
      session_time,
    });

    const roomCapacity = await SessionModel.getRoomCapacity(room_id);

    const tickets = [];
    for (let seat = 1; seat <= roomCapacity; seat++) {
      const ticket = await TicketsModel.createTicket({
        session_id: newSession.id,
        seat_number: seat,
        price: 42.5,
        user_id: null,
      });
      tickets.push(ticket);
    }

    res.status(201).json({
      message: "Sessão criada com sucesso!",
      session: newSession,
      tickets,
    });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    res.status(500).json({ error: "Erro ao criar sessão" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await SessionModel.delete(req.params.id);
    res.status(200).send("Deletado com sucesso");
  } catch (error) {
    console.error("error ao deletar sessão:", error);
    res.status(500).json({ error: "Erro ao deletar sessão" });
  }
};

exports.updateSession = async (req, res) => {
  const { movie_id, room_id, session_time } = req.body;
  try {
    const updatedSession = await SessionModel.update(req.params.id, {
      movie_id,
      room_id,
      session_time,
    });
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
    res.status(500).json({ error: "Erro ao atualizar sessão" });
  }
};
