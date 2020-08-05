const url = require('url');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // string -> object
  // 127.0.0.1:3000/xxx
  // Query String : 127.0.0.1:3000/?year=3&class=4&name=훈채
  const obj = url.parse(req.url, true);
  console.log(obj);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Hello, World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});