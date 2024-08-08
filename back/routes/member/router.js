var express = require("express");
var router = express.Router();
const controller = require("./controller.js");

router.get("", controller.getMember);

module.exports = router;
