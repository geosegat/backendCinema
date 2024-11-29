const express = require("express");
const TicketsController = require("../controllers/tickets");

module.exports = (pool) => {
  const router = express.Router();

  router.get("/", TicketsController.getAllTickets);
  router.get("/:id", TicketsController.getTicketById);
  router.post("/", TicketsController.createTicket);
  router.put("/:id", TicketsController.updateTicket);
  router.delete("/:id", TicketsController.deleteTicket);

  return router;
};
