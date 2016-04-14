function asyncFunction(callback){
  setTimeout(function(){
    callback();
  },0);
}

var color = 'blue';

asyncFunction(function(){
  console.log('The color 1 is ' + color);
});
var time1 = setTimeout(function(){
  console.log('The color 2 is ' + color);
},0);

clearTimeout(time1);

(function(color){
  asyncFunction(function(){
    console.log('The color 3 is ' + color);
  });
})(color);

color = 'green';
