const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("验证api接口是否正确");
});

module.exports = router;
