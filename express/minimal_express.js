var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.end('hello\n');
});
app.listen(3000);
