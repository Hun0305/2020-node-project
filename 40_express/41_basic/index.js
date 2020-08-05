var express = require('express');
var app = express();
const port = 3000;

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

//Query String
app.get('/', function(req, res) {
    console.log('req.query:', req.query);
    var title = req.query.title;
    var singer = req.query.singer;

    res.send('query string -> title:' + title + ', singer:' + singer);
});

app.get("/music", (req, res) => {
    //ES6, 객체 구조 분해 할당 (비구조화 할당)
    console.log(req);
    const { singer, title } = req.query; 
    res.send(`${singer}의 ${title}입니다`);   
    res.end(`singer : ${req.query.singer}, song : ${req.query.title}`);
})

//URL 파라미터
app.get("/music/:singer/:title", (req, res) => {
    const { singer, title } = req.params; // {singer:xx, title:xx  }
    res.send(`url parameter(get) -> ${singer}의 ${title}입니다`);
})

// POST 방식
// HTTP 메시지 : Header부, Body부
// GET : 헤더부에 데이터를 넣어 전송함, 데이터 길이에 제한, 캐싱가능
// POST : 바디부에 데이터를 넣어 전송함, 길이제한 X, 캐싱 불가능