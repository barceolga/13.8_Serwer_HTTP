var http = require('http');
var fs = require('fs');

var server = http.createServer();


server.on('request', function (request, response) {
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  if (request.method === 'GET' && request.url === '/quijote') {
    fs.readFile('./index.html', 'utf-8', function (err, file) {
      if (err) {
        throw err;
      } else {
        response.write(file);
      }
    });
  } else {
    response.setHeader("Content-Type", "image/jpg");
    response.statusCode = 404;
    fs.readFile("./error.jpg", "base64", function (err, img) {
      if (err) {
        throw err;
      } else {
        //response.write(img);
        response.write(Buffer.from(img).toString("base64"));
        response.end();
      };
    });
  }
//response.end();
});
server.listen(9000);
