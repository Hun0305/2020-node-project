const express = require("express");
const router = express.Router();
const ctrl = require("./movie.ctrl")

router.get("/", ctrl.list);
router.get("/new", ctrl.showCreatePage); // 등록 페이지 보여주기
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage); // 수정페이지 보여주기 

router.get("/:id", ctrl.checkId, ctrl.detail);

router.post("/", ctrl.create);

router.put("/:id", ctrl.checkId, ctrl.update);

router.delete("/:id", ctrl.checkId, ctrl.remove);

module.exports = router;    