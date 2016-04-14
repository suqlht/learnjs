var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
  //res.writeHead(200, {'Content-Type': 'image/jpg'});
  fs.createReadStream('/home/lht/tmp/h1.har').pipe(res);
}).listen(1337);
console.log('server is running.')


// fs.readFile('./resource.json', function(er, data){
//   console.log(data);
// });

// var stream = fs.createReadStream('./resource.json');
// stream.on('data', function(chunk){
//   console.log(chunk);
// });
//
// stream.on('end', function(){
//   console.log('finished');
// });
