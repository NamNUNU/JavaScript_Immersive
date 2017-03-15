function sum(a,b){
  return a+b;
}

function divide(a,b){
  return a/b;
}
function calcurate(method, prev){
  return function(next){
    debugger;
    return method(prev, next);
  }
}

var currySum = calcurate(sum,100);
var curryDivision = calcurate(divide, 100);
currySum(20);
curryDivision(20);
