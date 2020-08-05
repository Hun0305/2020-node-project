const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
//요정(request), 응답(response)
const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url==='/'){
        res.statusCode = 200; // 정상응답
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World'); //끝
    }
    else if(req.url==='/html') {
        //127.0.0.1:3000/
        res.writeHead(200, {'Content-Type': 'text/html' });
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<body><h1>Hello, World</h1></body>");
        res.write("</html>");
        res.end();
    }
    else if(req.url==='/json'){
        //127.0.0.1:3000/json
        const data = { msg : 'Hello, World' };
        res.statusCode = 200; // 정상응답
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data)); //끝
    } else {
        // 그 외의 url인 경우 not found
        // hmml 
        res.writeHead(404, {'Content-Type': 'text/html' });
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<body><h1>404 Not Found</h1></body>");
        res.write("</html>");
        res.end();

        /* plain으로 표시하는 경우
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
        */

        /* JSON으로 하는 경우
        const data2 = { msg : 'Not found'};
        res.statusCode = 404;
        res.setHeader('Content-Type', 'apllication/json');
        res.end(JSON.stringify(data2));
        */
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});