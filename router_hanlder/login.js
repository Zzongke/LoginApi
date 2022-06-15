const jwt = require("jsonwebtoken");
const request = require("../utils/mysql");
const bcrypt = require("bcrypt");

exports.handle_login = (req, res) => {
  const { uid, pwd } = req.body;
  const token = jwt.sign({ uid, pwd: "" }, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  const sql = "select pwd from user where name = ?";
  request.query(sql, [uid], (err, data) => {
    if (err) {
      res.status(500).send({ status: 0, message: "服务器错误" });
      return;
    }
    const { pwd: userPwd } = data[0];
    const isPwd = bcrypt.compareSync(pwd, userPwd);
    if (!isPwd) {
      res.status(404).send({ status: 0, msg: "密码错误" });
      return;
    }
    res.status(200).send({
      status: 1,
      msg: "登陆成功",
      token,
    });
  });
};

exports.handle_reguser = (req, res) => {
  const { uid, pwd, newpwd } = req.body;
  if (pwd !== newpwd) {
    res.status(404).send({
      status: 0,
      msg: "密码要一致",
    });
    return;
  }
  const sql = "select name from user where name = ?";
  request.query(sql, [uid], (err, data) => {
    if (err) {
      res.status(500).send({
        status: 0,
        msg: "服务器错误",
      });
      return;
    }
    if (data.length) {
      res.status(200).send({
        status: 0,
        msg: "用户已存在",
      });
      return;
    }
    const pwdHash = bcrypt.hashSync(pwd, 10);
    const sql = "insert into user (name,pwd) values (?,?)";
    request.query(sql, [uid, pwdHash], (err, data) => {
      if (err) {
        res.status(500).send({
          status: 0,
          msg: "服务器错误",
        });
        return;
      }
      res.status(200).send({
        status: 1,
        msg: "用户注册成功",
      });
    });
  });
};
