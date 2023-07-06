const mysql = require("mysql");
const request = mysql.createPool({
  host: "106.55.107.78",
  user: "sa",
  password: "user@1234",
  database: "ceshi",
});

request.getConnection((err, connection) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  connection.release();
  console.log("数据库连接成功");
});
module.exports = request;
