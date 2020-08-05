const mongoose = require("mongoose");

const TodaySchema = new mongoose.Schema({
    minIndex: String,
    maxIndex: String,
    date: String,
    I1 : String,  
    I2 : String,  
    I3 : String  
}); 

// 스키마를 사용한 모델 객체 생성
// 컬렉션 -> musics 컬렉션 생성
const Today = mongoose.model("today", TodaySchema, "today");

module.exports = Today;