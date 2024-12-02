const Server = require("./server");

Server.Up()
  .then(() => console.log("deu certo"))
  .catch((e) => console.log("deu errado", e));

process.on("exit", Server.Down);
