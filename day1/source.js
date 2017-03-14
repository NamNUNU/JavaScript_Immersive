function test(){
  var element = document.querySelectorAll("div");
  var count = 0;
  for(var key in element){
    var class_name = element[key].className;
    if(class_name===undefined){
      continue;
    }
    if((class_name.toString().indexOf("-")!==-1)||(class_name.toString().indexOf("_")!==-1)){
      count++
    }
  }
  console.log(count);
}
