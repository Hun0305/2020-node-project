const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");
 
router.get("/signup", ctrl.showSignupPage); // 회원가입 페이지 만듬
router.get("/login", ctrl.showLoginPage);
router.get("/logout", ctrl.logout);
router.post("/signup", ctrl.signup); // 회원가입
router.post("/login", ctrl.login); // 로그인

module.exports = router;