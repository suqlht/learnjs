var flow = require('nimble');

flow.series([
  function(callback){
    setTimeout(function(){
      console.log('i go first!');
      callback();
    }, 1000);
  },
  function(callback){
    setTimeout(function(){
      console.log('i go second');
      callback();
    }, 500);
  },

  function(callback){
    setTimeout(function(){
      console.log('i go last');
      callback();
    }, 100);
  }

]);
