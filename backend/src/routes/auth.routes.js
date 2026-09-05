const express = require("express");
const router = express.Router();
const authcontroller = require('../controller/auth.controller')
router.post("/register", authcontroller.userRegisterController)
router.post("/login",authcontroller.userLoginController)
module.exports = router 