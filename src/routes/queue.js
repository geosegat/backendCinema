const express = require("express");
const QueueController = require("../controllers/queue");

module.exports = () => {
  const router = express.Router();

  router.post("/", QueueController.addToQueue);
  router.post("/process", QueueController.processQueue);
  router.get("/:session_id", QueueController.getQueue);
  router.get("/:session_id/processed", QueueController.getProcessedQueue);

  router.delete("/:session_id/clear", QueueController.clearQueue);

  return router;
};
