const express = require("express");
const router = express.Router();

router.use("/user", require("./user")); // 뒤에 /index.js는 생략 가능함
router.use("/word", require("./word"));
router.use("/today", require("./today"));
router.use("/inventory", require("./inventory"));

module.exports = router;