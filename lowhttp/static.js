var http = require('http');
var fs = require('fs');
var join = require('path').join;
var parse = require('url').parse;
var root = __dirname;
//
// var server = http.createServer(function(req, res){
//   var url = parse(req.url);
//   var path = join(root, url.pathname);
//   var stream = fs.createReadStream(path);
//   stream.on('data', function(chunk){
//     res.write(chunk);
//   });
//   stream.on('end', function(){
//     res.end();
//   });
//
//   stream.on('error', function(err){
//     res.statusCode = 500;
//     res.end('Internet Server Error\n');
//   });
// });

var server2 = http.createServer(function(req, res){
  var url = parse(req.url);
  var path = join(root, url.pathname);
  fs.stat(path, function(err, stat){
    if(err){
      if('ENOENT' == err.code){
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('internal server error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      stream.on('error', function(err){
        res.statusCode = 500;
        res.end('Internal server error');
      });
    }

  });

});

server2.listen(3000);
