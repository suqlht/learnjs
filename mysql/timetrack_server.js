var http = require('http')
  , work = require('./lib/timetrack')
  , mysql = require('mysql');

var db = mysql.createConnection({
  host:           'localhost',
  user:           'lht',
  password:        'lht',
  database:        'mytest'
});

var server = http.createServer(function(req, res){
  switch ( req.method ){
    case 'POST':
      switch(req.url){
        case '/':
          work.add(db, req, res);
          break;
        case '/archive':
          work.archive(db, req, res);
          break;
        case '/delete':
          work.delete(db, req, res);
          break;
      }
      break;
    case 'GET':
      switch(req.url){
        case '/':
          work.show(db, res);
          break;
        case '/archive':
          work.showArchived(db, res);
          break;
      }
      break;
  }
});

db.query("CREATE TABLE IF NOT EXISTS work ("
      +  "id INT(10) NOT NULL AUTO_INCREMENT, "
      + "hours DECIMAL(5,2) DEFAULT 0, "
+ "date DATE, "
+ "archived INT(1) DEFAULT 0, "
+ "description LONGTEXT,"
+ "PRIMARY KEY(id))",
  function(err){
  if(err) throw err;
  console.log('server started...');
  server.listen(8888);
});
