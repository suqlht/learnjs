var fs = require('fs')
  , path = require('path')
  , args = process.argv.splice(2)
  , command = args.shift()
  , taskDescription = args.join(' ')
  , file = path.join(process.cwd(), '/.tasks');

switch ( command ) {
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTasks(file, taskDescription);
    break;
  default:
    console.log('Usage: ' + process.argv[0]
    + ' list|add [taskDescription]');
    break;
}

function loadOrInitializeTaskArray(file, cb){
  fs.exists(file, function(exists){
    var tasks = [];
    if(exists){
      fs.readFile(file, function(err, data){
        if(err) throw err;
        var data = data.toString();
        var tasks = JSON.parse(data);
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}

function listTasks(file){
  loadOrInitializeTaskArray(file, function(tasks){
    for(var i in tasks){
      console.log(tasks[i]);
    }
  });
}

function storeTasks(file, tasks){
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err){
    if(err) throw err;
    console.log('Saved.');
  });
}

function addTasks(file, taskDescription){
  loadOrInitializeTaskArray(file, function(tasks){
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
}
