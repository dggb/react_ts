const controller = require("./controller");
const service = require("./service");
const router = require("./router");
const query = require("./query");
const NAMESPACE = "imageboard";

module.exports = {
  controller,
  service,
  router,
  query,
  NAMESPACE,
};
