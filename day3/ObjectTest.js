// 일반 객체
var healthObj = {
	name : "달리기",
	lastTime : "PM10:12",
	showHealth :function(){
		console.log("오늘은"+this.lastTime+"까지"+this.name+" 운동을 하셨네요");
	}
}

healthObj.showHealth();

// 생성자로 객체를 생성할때
function WORD(name,key){
  this.name =  name;
  this.key = key;
}

var word = new WORD('jinny','jisu');
console.log(word.key)
