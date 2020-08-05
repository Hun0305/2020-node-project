const express = require("express");
const router = express.Router();
const ctrl = require("./music.ctrl");

// 라우팅 설정

router.get("/", ctrl.list); //목록조회
router.get("/:id", ctrl.detail) // 상세조회 

router.post("/", ctrl.create); //등록

router.put("/:id", ctrl.update); //수정

router.delete("/:id", ctrl.remove); //삭제

module.exports = router;