function test(){
  var element = document.querySelectorAll("div");
  var count = 0;
  for(var key in element){
    var class_name = element[key].className;
    if(class_name===undefined){
      continue;
    }
    if(class_name.toString().match(/_|-/g)!==null){
        count++
      }
    }
    console.log(count);
}
