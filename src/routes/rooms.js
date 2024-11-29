const express = require("express");
const RoomsController = require("../controllers/rooms");

module.exports = (pool) => {
  const router = express.Router();

  router.get("/", RoomsController.getAllRooms);
  router.get("/:id", RoomsController.getRoomById);
  router.post("/", RoomsController.createRoom);
  router.put("/:id", RoomsController.updateRoom);
  router.delete("/:id", RoomsController.deleteRoom);

  return router;
};
