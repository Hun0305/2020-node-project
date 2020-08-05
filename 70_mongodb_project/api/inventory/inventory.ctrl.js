const InventoryModel = require("../../models/inventory");
const WordModel = require("../../models/word");

const showInventory = (req, res) => {
    const user_id = res.locals.user._id;
    var result = [];

    InventoryModel.find({ user_id }, (err, result1) => {
        if (err) return res.status(500).send("나만의 단어장을 불러 오는 중 오류가 발생했습니다.");
        result1.forEach(result1 => {
                WordModel.find({_id : result1.word_id}, (err, result2) => {
                if (err) return res.status(500).send("나만의 단어장을 불러 오는 중 오류가 발생했습니다.(2)");
                if (result2) result.push(result2[0]);
            })
        })
    });
    setTimeout(function() {
        //console.log(result);
        res.render("word/inventory", { result });
    }, 200);
}

const createInventory = (req, res) => {
    const { user_id, word_id } = req.body;

    InventoryModel.find({ _id : user_id, word_id}, (err, result) => {
        if (err) if (err) return res.status(500).send("나만의 단어장 중복 확인 중 오류가 발생했습니다");
        if (result) if (err) return res.status(409).send("이미 단어장에 추가된 단어입니다.");
    })    
    const inventory = new InventoryModel({ user_id, word_id });
    inventory.save((err, result) => {
        if (err)
            return res.status(500).send("DB에 나만의 단어를 저장하는 중 오류가 발생했습니다");
        res.status(201).json(result);
    });
}

const deleteInventory = (req, res) => {
    const { user_id, word_id } = req.body;
    InventoryModel.findOneAndRemove({user_id, word_id}, (err, result) => {
        if (err) return res.status(500).send("나만의 단어장에서 단어를 삭제하는 중 오류가 발생했습니다.(1)");
        if (!result) return res.status(404).send("나만의 단어장에서 단어를 삭제하는 중 값을 찾지 못했습니다.");
    })
}

module.exports = { showInventory, createInventory, deleteInventory };