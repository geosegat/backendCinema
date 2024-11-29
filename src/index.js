const express = require("express");
const { Pool } = require("pg");
const ticketsRoutes = require("./routes/tickets");
const moviesRoutes = require("./routes/movies");
const roomsRoutes = require("./routes/rooms");
const sessionsRoutes = require("./routes/sessions");
const queueRoutes = require("./routes/queue");

const app = express();
const port = 3001;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cinema_banco",
  password: "020296",
  port: 5432,
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("deu certo");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
})();

app.use("/movies", moviesRoutes(pool));
app.use("/tickets", ticketsRoutes(pool));
app.use("/rooms", roomsRoutes(pool));
app.use("/sessions", sessionsRoutes());
app.use("/queue", queueRoutes());

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
