// new 키워드를 사용하지 않고 객체를 만드는 방법
var healthObj = {
  showHealth : function(){
    console.log(" " + this.lastTime + " " + this.name + " ");
  }
}

function Health(name, lastTime){
  this.name = name;
  this.lastTime  = lastTime;
}

// create로 prototype객체를 만들어서 변수에 넣어준다, es5
var myHealth = Object.create(healthObj);

myHealth.name = "달리기";
myHealth.lastTime = "23:10";

myHealth.showHealth();

// assign으로 생성과 동시에 변수에 값을 할당, es6
var myHealth2 = Object.assign(Object.create(healthObj),{
  name : "달리기",
  lastTime : "23:10"
});

myHealth2.showHealth();

// setPrototypeOf을 이용하여 클래스 만들기, es6
function Health2(name, lastTime){
  return {
    name : name,
    lastTime : lastTime
  }
}

var myHealth3 = Health2("달리기","23:10");
Object.setPrototypeOf(myHealth3, healthObj);

myHealth3.showHealth();


// class를 이용하여 클래스 만들기, es6
class Health3{
  constructor(name, lastTime) {
  this.name = name;
  this.lastTime  = lastTime;
  }

  showHealth(){
    console.log(" " + this.lastTime + " " + this.name + " ");
  }
}

// create로 prototype객체를 만들어서 변수에 넣어준다, es5
var myHealth = new Health3("달리기", "23:10");

myHealth.showHealth();
