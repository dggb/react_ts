const { defaultPool, Pool } = require("../../lib/DB/connect");
const query = require("./query");

exports.getImageBoards = async (items) => {
  try {
    const { limit, page } = items;
    const offset = (page - 1) * limit;

    return await defaultPool
      .query(query.getImageBoards, [limit, offset])
      .then((res) => {
        return res.rows;
      });
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.insertImageBoard = async (boards) => {
  try {
    for (const board of boards) {
      await defaultPool.query(query.insertImageBoard, [
        board.author,
        board.download_url,
        board.height,
        board.url,
        board.width,
      ]);
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.deleteImageBoard = async () => {
  try {
    return await defaultPool.query(query.deleteImageBoard).then((res) => {
      return res.rows;
    });
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
