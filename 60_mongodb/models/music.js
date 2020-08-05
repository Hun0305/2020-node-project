const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등
const MusicSchema = new mongoose.Schema({
    singer: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    src : {
        type : String,
        required : true,
        trim : true,
        default : "https://post-phinf.pstatic.net/MjAyMDA0MjJfMTAg/MDAxNTg3NDgxNTMyMDk0.Pd1z_JuC-s42HqHqjkaIDdWzi4jiQIFIzxGKkwB5_VMg.FIRY61HZfNi4a6v5p85tPMoh1GB7XP9v7EoKmIyHVNog.JPEG/10276861_1000.jpg?type=w1200"
    }
}); 

// 스키마를 사용한 모델 객체 생성
// 컬렉션 -> musics 컬렉션 생성
const Music = mongoose.model("music", MusicSchema, "music");

module.exports = Music;