var http = require('http')
  , counter = 0;

http.createServer(function(req, res){
  counter ++;
  res.end('I have been accessed ' + counter + ' times.' );
}).listen(3000, '127.0.0.1');
