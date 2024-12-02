const TicketsModel = require("../repositories/tickets");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketsModel.getAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Erro ao buscar ingressos:", error);
    res.status(500).json({ error: "Erro ao buscar ingressos" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await TicketsModel.getById(req.params.id);
    if (!ticket)
      return res.status(404).json({ error: "Ingresso não encontrado" });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Erro ao buscar ingresso:", error);
    res.status(500).json({ error: "Erro ao buscar ingresso" });
  }
};

exports.createTicket = async (req, res) => {
  const { session_id, seat_number, price, user_id } = req.body;
  try {
    const newTicket = await TicketsModel.create({
      session_id,
      seat_number,
      price,
      user_id,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Erro ao criar ingresso:", error);
    res.status(500).json({ error: "Erro ao criar ingresso" });
  }
};

exports.updateTicket = async (req, res) => {
  const { session_id, seat_number, price, user_id } = req.body;
  try {
    const updatedTicket = await TicketsModel.update(req.params.id, {
      session_id,
      seat_number,
      price,
      user_id,
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Erro ao atualizar ingresso:", error);
    res.status(500).json({ error: "Erro ao atualizar ingresso" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await TicketsModel.delete(req.params.id);
    res.status(200).send("Deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar ingresso:", error);
    res.status(500).json({ error: "Erro ao deletar ingresso" });
  }
};
