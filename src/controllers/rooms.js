const RoomsModel = require("../repositories/rooms");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomsModel.getAll();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    res.status(500).json({ error: "Erro ao buscar salas" });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await RoomsModel.getById(req.params.id);
    if (!room) return res.status(404).json({ error: "Sala não encontrada" });
    res.status(200).json(room);
  } catch (error) {
    console.error("Erro ao buscar sala:", error);
    res.status(500).json({ error: "Erro ao buscar sala" });
  }
};

exports.createRoom = async (req, res) => {
  const { name, capacity, type } = req.body;
  try {
    const newRoom = await RoomsModel.create({ name, capacity, type });
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Erro ao criar sala:", error);
    res.status(500).json({ error: "Erro ao criar sala" });
  }
};

exports.updateRoom = async (req, res) => {
  const { name, capacity, type } = req.body;
  try {
    const updatedRoom = await RoomsModel.update(req.params.id, {
      name,
      capacity,
      type,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Erro ao atualizar sala:", error);
    res.status(500).json({ error: "Erro ao atualizar sala" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await RoomsModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar sala:", error);
    res.status(500).json({ error: "Erro ao deletar sala" });
  }
};
