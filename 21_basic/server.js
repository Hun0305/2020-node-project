var http = require('http');
var url = require('url');

// http.Server 객체 생성
http.createServer(function (req, res) {
    // 요청메시지 분석
    console.log('Method:', req.method);
    console.log('URL:', req.url);

    var parsed = url.parse(req.url, true);
    console.log(parsed.query.id);

   // 1. 응답 메세지 헤더부 작성
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;

    // 2. 응답 메시지 바디부 작성
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>안녕!</h1>');
	
    // 3. end() : 응답 메시지 작성 끝
    res.end('끝');
}).listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});