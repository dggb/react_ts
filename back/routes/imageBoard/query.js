exports.getImageBoards = `SELECT * FROM board
ORDER BY id
LIMIT $1 OFFSET $2;`;

exports.insertImageBoard = `insert into board (id,author, download_url, height, url, width) VALUES (
    COALESCE((SELECT MAX(id) + 1 FROM board), 1),$1, $2, $3, $4, $5)`;

exports.deleteImageBoard = `delete from board`;
