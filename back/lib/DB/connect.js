const { Pool, Client } = require("pg");
const { db_server } = require("../../config/config.json");

const defaultPool = new Pool({
  user: db_server.user,
  host: db_server.server,
  database: db_server.database,
  password: db_server.password,
  port: db_server.port,
});

const abc = {
  a: 1,
};

module.exports = {
  defaultPool,
  abc,
};
