const express = require("express");
const router = express.Router();

router.use("/music", require("./music"));
router.use("/movie", require("./movie"));
router.use("/user", require("./user")); // 뒤에 /index.js는 생략 가능함

module.exports = router;