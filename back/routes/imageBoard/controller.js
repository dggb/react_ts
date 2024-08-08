const service = require("./service");

exports.getImageBoards = async (req, res) => {
  try {
    let rows = await service.getImageBoards(req.query);
    return res.send(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.insertImageBoard = async (req, res) => {
  try {
    let rows = await service.insertImageBoard(req.body);
    return res.send(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteImageBoard = async (req, res) => {
  try {
    let rows = await service.deleteImageBoard();
    return res.send(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
