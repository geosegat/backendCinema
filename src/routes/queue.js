const express = require("express");
const QueueController = require("../controllers/queue");

module.exports = () => {
  const router = express.Router();

  router.post("/", QueueController.addToQueue);
  router.post("/process", QueueController.processQueue);
  router.get("/position", QueueController.getMyPosition);
  // router.delete("/:session_id/clear", QueueController.clearQueue);

  return router;
};
