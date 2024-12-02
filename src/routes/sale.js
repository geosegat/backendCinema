const express = require("express");
const { BuyTicket } = require("../controllers/sales");

module.exports = (pool) => {
  const router = express.Router();
  router.post("/:userId/:ticketId", BuyTicket);
  return router;
};
