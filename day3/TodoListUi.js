

function MyTest(){
  this.todo_Arr = [];
  this.complete_Arr = [];
}

var manage =  {
  addTask : function(){
    var task = document.querySelector("#todotext").value;
    if(task===""){return }

    this.todo_Arr.push(task);
    this.showAll();
    document.querySelector("#todotext").value = "";
    document.querySelector("#warning").innerHTML = ""
  },

  completeTask : function(){
    var index;
    var flag = true;

    var task = document.querySelector("#todotext").value;
    if(task===""){return }

    for(var i =0; i<this.todo_Arr.length; i++){
      if(this.todo_Arr[i]!==task){
        continue;
      }
      index = this.todo_Arr.lastIndexOf(task);
      this.complete_Arr.push(this.todo_Arr.splice(index,1))
      flag = false;
      break;
    }
    if(flag){
      document.querySelector("#warning").innerHTML = "<p>This is not registed on TODO list<p>"
    }else{
      document.querySelector("#warning").innerHTML = ""
      this.showAll();
    }
    document.querySelector("#todotext").value = "";
  },

  showAll : function(){
    var todoStr = "";
    var completeStr = "";

    this.todo_Arr.forEach(function(val){
      todoStr += "<li>"+val+"</li>"
    })

    this.complete_Arr.forEach(function(val){
      completeStr += "<li>"+val+"</li>"
    })

    document.querySelector("#todo").innerHTML = todoStr;
    document.querySelector("#done").innerHTML = completeStr;
  }
}


MyTest.prototype = manage;

var mytest1 = new MyTest();

document.querySelector("#add").addEventListener("click", mytest1.addTask.bind(mytest1));
document.querySelector("#complete").addEventListener("click", mytest1.completeTask.bind(mytest1));
