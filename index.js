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
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.statusCode = 404;
    fs.readFile("./error.jpg", function (err, img) {
      if (err) {
        throw err;
      } else {
        //response.write(img);
        response.write('<h1>Wrong path!</h1><img src="data:image/jpg;base64, '+Buffer.from(img).toString("base64")+'">');
        response.end();
      };
    });
  }

});
server.listen(8000);
