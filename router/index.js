const express = require("express");
const router = express.Router();
const { validate, Joi } = require("express-validation");

// 登录
const { handle_login, handle_reguser } = require("../router_hanlder/login");
const request = require("../utils/mysql");
const loginValidation = {
  body: Joi.object({
    uid: Joi.string().required(),
    pwd: Joi.string().required(),
  }),
};
router.post("/login", validate(loginValidation), handle_login);
// 注册
const reguserValidation = {
  body: Joi.object({
    uid: Joi.string().min(2).max(12).required(),
    pwd: Joi.string().required(),
    newpwd: Joi.string().required(),
  }),
};
router.post("/reguser", validate(reguserValidation), handle_reguser);

module.exports = router;
