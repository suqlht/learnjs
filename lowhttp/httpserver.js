var http = require('http');

var server = http.createServer(function(req, res){
  res.write('hello, world');
  res.end();
});
server.listen(8888,'127.0.0.1');
