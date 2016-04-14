var http = require('http');
var server = http.createServer(function(req, res){
  var url = 'http://baidu.com';
  var body = '<p>redirecting to <a href="' + url + '">'+ url + '</a></p>';
  res.setHeader('Location', url);
  res.setHeader('Content-Length', body.length);
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 302;
  res.end(body);
});

server.listen(3000, '127.0.0.1');
