const express = require("express");
const router = express.Router();
const ctrl = require("./word.ctrl");
 
router.get("/new", ctrl.showCreatePage);
router.post("/create", ctrl.createWord); 
router.get("/search/:query", ctrl.searchWord);
router.get("/justsearch/:query", ctrl.justSearchWord);

router.get("/list", ctrl.list);

module.exports = router;