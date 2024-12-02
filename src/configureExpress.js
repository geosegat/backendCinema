const express = require("express");
const cors = require("cors");
const ticketsRoutes = require("./routes/tickets");
const moviesRoutes = require("./routes/movies");
const roomsRoutes = require("./routes/rooms");
const sessionsRoutes = require("./routes/sessions");
const queueRoutes = require("./routes/queue");
const salesRouter = require("./routes/sale");

const app = express();

exports.ConfigureExpress = async function ConfigureExpress(pool, port) {
  app.use(express.json());
  app.use(cors());
  app.use("/movies", moviesRoutes(pool));
  app.use("/tickets", ticketsRoutes(pool));
  app.use("/rooms", roomsRoutes(pool));
  app.use("/sessions", sessionsRoutes());
  app.use("/queue", queueRoutes());
  app.use("/sales", salesRouter());
  app.get("/", (req, res) => {
    res.send("api rodando!!!");
  });

  app.post("/teste", (req, res) => {
    const data = req.body;
    res.status(201).json(data);
  });

  app.listen(port, () => {
    console.log(`ta rodando http://localhost:${port}`);
  });
};
