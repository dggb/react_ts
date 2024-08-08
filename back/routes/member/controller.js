const service = require("./service");

exports.getMember = async (req, res) => {
  try {
    let rows = await service.getMember();
    return res.send(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
