const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

// init
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
app.use("/", require("./router"));

app.listen(8000, () => {
  console.log("服务启动");
});
