
// prototype을 사용하여 Health function 접근
var healthObj = {
  showHealth : function(){
    console.log(" " + this.lastTime + " " + this.name + " ");
  }
}

function Health(name, lastTime){
  this.name = name;
  this.lastTime  = lastTime;
}

Health.prototype = healthObj;

var myHealth = new Health("달리기", "20:00");
myHealth.showHealth();

var myHealth2 = new Health("자전거", "18:11");
myHealth2.showHealth();

var myHealth3 = new Health("수영", "19:25");
myHealth3.showHealth();

// tip) __는 보통 내부용, 접근이 제한되는 변수앞에 붙인다.
// proto 내부에 function 확인
console.log(myHealth.__proto__.showHealth;
