require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

// init
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// token
const { expressjwt: jwt } = require("express-jwt");
app.use(
  jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login", "/reguser"],
  })
);

// router
app.use("/", require("./router"));
app.use("/api", require("./router/api/index"));

// 全局错误
const { ValidationError } = require("express-validation");
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
    return;
  }
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ status: 0, msg: "权限未授权" });
    return;
  }
  res.status(500).send({ status: 0, message: "全局服务器错误" });
});

http.createServer(app).listen(8000, () => {
  console.log("服务启动");
});
