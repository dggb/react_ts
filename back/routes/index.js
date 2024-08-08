var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

const MEMBER = require("./member");
const IMAGEBOARD = require("./imageBoard");

const apis = [MEMBER, IMAGEBOARD];

for (let api of apis) {
  router.use(`/api/${api.NAMESPACE}`, api.router);
}

module.exports = router;
