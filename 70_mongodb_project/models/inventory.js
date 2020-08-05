const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    user_id: String,
    word_id: String, 
}); 

// 스키마를 사용한 모델 객체 생성
// 컬렉션 -> musics 컬렉션 생성
const Inventory = mongoose.model("inventory", InventorySchema, "inventory");

module.exports = Inventory;