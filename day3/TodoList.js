function MyTest(){
  this.todo_Arr = [];
  this.complete_Arr = [];
}

var manage =  {
  addTask : function(task){
    this.todo_Arr.push(task);
  },

  completeTask : function(task){
    var index;
    for(var i =0; i<this.todo_Arr.length; i++){
      if(this.todo_Arr[i]!==task){
        continue;
      }
      index = this.todo_Arr.indexOf(task);
      this.complete_Arr.push(this.todo_Arr.splice(index,1)[0])
    }
  },

  showAll : function(){
    console.log("TODO list :")
    this.todo_Arr.forEach(function(val){
      console.log(val);
    })
    console.log("\nComplet list :")
    this.complete_Arr.forEach(function(val){
      console.log(val);
    })
  }
}

MyTest.prototype = manage;

var mytest1 = new MyTest();

mytest1.addTask("update");
mytest1.addTask("add");
mytest1.addTask("delete");
mytest1.completeTask("add");
mytest1.completeTask("delete");
mytest1.showAll();
