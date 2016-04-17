var test1 = function(){
  setTimeout(function(){console.log('test1')},1000);

}

var test2 = function(){
  setTimeout(function(){console.log('test2')},500);

}

test1();
test2();
