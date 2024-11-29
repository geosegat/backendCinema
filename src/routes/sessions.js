const express = require("express");
const SessionsController = require("../controllers/sessions");

module.exports = () => {
  const router = express.Router();
  router.get("/", SessionsController.getAllSessions);
  router.get("/:id", SessionsController.getSessionById);
  router.post("/", SessionsController.createSession);
  router.put("/:id", SessionsController.updateSession);
  router.delete("/:id", SessionsController.deleteSession);

  return router;
};
