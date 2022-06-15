const mysql = require("mysql");
const request = mysql.createConnection({
  host: "106.55.107.78",
  user: "sa",
  password: "user@1234",
  database: "ceshi",
});

request.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("数据库连接成功");
});

module.exports = request;
