var express = require("express");
var router = express.Router();
const controller = require("./controller.js");

router.get("", controller.getImageBoards);

router.post("/insertImageBoard", controller.insertImageBoard);

router.delete("/deleteImageBoard", controller.deleteImageBoard);

module.exports = router;
