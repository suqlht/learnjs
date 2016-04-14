var http = require('http');
var items = [];

var server = http.createServer(function(req, res){
  if(req.url == '/') {
    switch(req.method){
      case 'POST':
        add(req, res);
        break;
      case 'GET':
        show(res);
        break;
      default :
        badRequest(res);
        break;
    }

  } else {
    notFound(res);
  }
});

function show(res){
  var html = '<h1>ToDoList</h1>'
           + '<ul>'
           + items.map(function(item){
             return '<li>' + item + '</li>'
           }).join('')
           + '</ul>'
           + '<form method="POST" action="/">'
           + '<p><input type="text" name="item" /></p>'
           + '<p><input type="submit" value="Add Item" /></p>'
           + '</form>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function notFound(res){
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('not found');
}

function badRequest(res){
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('bad request');
}

var qs = require('querystring');

function add(req, res){
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
    var obj = qs.parse(body);
    items.push(obj.item);
    show(res);
  });
}


server.listen(3000, '127.0.0.1');
