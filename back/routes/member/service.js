const { defaultPool, Pool } = require("../../lib/DB/connect");
const query = require("./query");

exports.getMember = async () => {
  try {
    return await defaultPool.query(query.getMember).then((res) => {
      return res.rows;
    });
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
