const express = require("express");
const router = express.Router();
const ctrl = require("./today.ctrl");
 
router.get("/list", ctrl.showTodayList); // 회원가입 페이지 만듬

module.exports = router;