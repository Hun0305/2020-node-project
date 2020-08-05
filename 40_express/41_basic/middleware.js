// 미들웨어(middleware)
// Express 어플리케이션 : 뼈대
// 어플에 필요한 기능을 미들웨어로 추가

var express = require('express');
var moment = require('moment');
var app = express();
app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// 미들웨어는 호출 순서가 중요
// 1.애플리케이션 레벨 미들웨어
const mw1 = (req, res, next) => {
    console.log("첫 미들웨어");
    next();
}

const mw2 = (req, res, next) => {
    console.log("두번째 미들웨어");
    next();
}

const logger = (req, res, next) => {   
    const { method, url } = req; //req.method, req.url
    const time = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    console.log(`${method} - ${url} - ${time}`);
    next();
}


app.use(mw1);
app.use(mw2);
app.use(logger);


app.get("/", (req, res) => {
    res.send("Hello, World!");
})

// 로깅처리하는 미들웨어 함수 정의



// 2. 라우터 레벨 미들웨어

// 3. 기본 제공 미들웨어
app.use(express.static("public"));

// 4. 서드 파티 미들웨어 
const bodyParser = require("body-parser");
app.use (bodyParser.urlencoded({extended : false}));

// 5. 오류 처리 미들웨어
app.use((err, req, res, _) => {
    //
})
