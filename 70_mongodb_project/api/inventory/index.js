const express = require("express");
const router = express.Router();
const ctrl = require("./inventory.ctrl");
 
router.get("/list", ctrl.showInventory);
router.post("/create", ctrl.createInventory); // 회원가입 페이지 만듬
router.delete("/delete", ctrl.deleteInventory);

module.exports = router;