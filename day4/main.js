


////////////////////////////////
// View 객체


// second View 객체 생성자 prototype에 들어갈 method
function titleView(){
    this.str = ""
}

var titleShow = {
  showContent : function(){
    this.str = remocon.getTitle();
    document.querySelector("nav>ul").innerHTML = this.str;
    controllerObj.highlight();
  }
}

titleView.prototype = titleShow;

// third View 객체 생성자 & prototype에 들어갈 method
function articleView(){
    this.str = ""
}

var articleShow = {
  showContent : function(){
    this.str = remocon.getContent();
    document.querySelector(".content").innerHTML = this.str;
    if(!controllerObj.isEmpty()){
      document.querySelector("button").addEventListener("click", remocon.deleteClick);
    }
  }
}

articleView.prototype = articleShow;

////////////////////////////////
// controller 객체

var controllerObj = {

  //  삭제 버튼을 클릭 했을 때
  deleteClick : function(event){
    data.json.splice(data.cur_index, 1);
    if(data.json.length !== 0){
      if(data.cur_index < 0){
        data.cur_index = 0;
      }else if(data.cur_index > data.json.length - 1){
        data.cur_index = data.json.length - 1;
      }
    }
    view2.showContent();
    view3.showContent();
  },

  // news title을 클릭 했을 때
  titleClick :function(event){
    var title = event.target.className;
    var json = data.json;
    for(var i = 0; i<json.length; i++){
      if(json[i].title===title){
        data.cur_index = i;
        break;
      }
    }
    view2.showContent();
    view3.showContent();
  },

  // navigation 버튼을 클릭 했을 때
  navClick: function(event){
    var destination = event.target.parentElement.className;

    if(destination==="left"){
      data.cur_index===0 ? data.cur_index = data.json.length-1 : data.cur_index--;
    }else{
      data.cur_index=== data.json.length-1 ? data.cur_index = 0 : data.cur_index++;
    }

    view2.showContent();
    view3.showContent();
  },

  // 기사 제목 받아오기
  getTitle : function(view){
    if(this.isEmpty()){ return "" }

    var str = ""
    data.json.forEach(function(val){
        str += '<li class="'+val.title+'">{title}</li>'.replace('{title}',val.title);
    })
    return str;
  },


  // 기사 받아오기
  getContent : function(){
    if(this.isEmpty()){ return "" }
    var title = data.json[data.cur_index].title;
    var str = ""

    data.json.forEach(function(val){
        if(val.title===title){
          var template = document.querySelector("#newsTemplate").innerHTML;
          var newsList = val.newslist.reduce(function(a, b){return a+"<li>"+b+"</li>"},"");
          str = template.replace("{title}",val.title).replace("{imgurl}",val.imgurl).replace("{newsList}",newsList);
        }
    })

    return str;

  },

  // 선택된 title 강조 효과 설정
  highlight : function(){
    if(this.isEmpty()){ return }

    var title = data.json[data.cur_index].title;
    var element = document.querySelectorAll("nav>ul>li");

    element.forEach(function(val){
      if(val.innerText===title){
        val.style.color = "red";
        val.style.fontWeight = "bold";
      }else{
        val.style.color = "black";
      }
    })
  },

  // json이 비어있는지 확인
  isEmpty : function(){
    return data.json.length===0 ? true : false;
  }

}

////////////////////////////////
// Model 객체

// Ajax 요청 function
function sendAjax(func) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func);
    oReq.open("GET", "./data/newslist.json");
    oReq.send();

}

// 데이터 저장 obj
function dataModelObj(){
  this.json = [];
  this.cur_index = 0;

}

// 데이터 저장 prototype method
var dataMethod = {

  setData : function(){
    data.json = JSON.parse(this.responseText)
    view2.showContent();
    view3.showContent();
  }

}

dataModelObj.prototype = dataMethod;

////////////////////////////////
// Init

var data = new dataModelObj();
var view2 = new titleView();
var view3 = new articleView();
var remocon = Object.create(controllerObj);

document.addEventListener("DOMContentLoaded", function(){
    sendAjax(data.setData);
});

document.querySelector(".btn .left").addEventListener("click", remocon.navClick);
document.querySelector(".btn .right").addEventListener("click", remocon.navClick);
document.querySelector("nav>ul").addEventListener("click", remocon.titleClick);
