const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
        minlength : 2,
        maxlength : 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token : {
        type : String,  
    },
}); 

// 스키마를 사용한 모델 객체 생성
// 컬렉션 -> musics 컬렉션 생성
const User = mongoose.model("user", UserSchema, "user");

module.exports = User;