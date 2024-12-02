const { ConfigureDataBase } = require("./configureDatabase");
const { ConfigureExpress } = require("./configureExpress");
let _pool;
exports.Up = async function Up() {
  const pool = await ConfigureDataBase();
  await ConfigureExpress(pool, 3001);
  _pool = pool;
};

exports.Down = async function Down() {
  if (_pool) {
    await _pool.end();
  }
};
