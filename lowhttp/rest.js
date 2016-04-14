var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
  switch(req.method){
    case 'POST':
      req.setEncoding('utf8');
      var item = '';
      req.on('data', function(data){
        item += data;
      });
      req.on('end', function(chunk){
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      // items.forEach(function(item, i){
      //     res.write(i + ') ' + item +'\n');
      // });
      // res.end();
      var body = items.map(function(item, i){
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      if(!isNaN(i)){
        res.statusCode = 400;
        res.end('invalid number\n');
      } else if(!(items[i])){
        res.statusCode = 404;
        res.end('item not exist\n');
      } else {
        items.splice(i, 1);
        res.end('ok\n');
      }
      break;
  }
});

server.listen(3000, '127.0.0.1');
