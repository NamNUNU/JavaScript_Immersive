var current_title = "";   // 현재 content 값을 저장하는 variable




// Ajax 요청 function
function sendAjax(func) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func);
    oReq.open("GET", "./data/newslist.json");
    oReq.send();

}

////////////////////////////////
// View 객체

function firstView(){
    this.str = ""
    this.navClick = function(event){
      data.navClick(event.target.parentElement.className);
    }
}

function secondView(){
    this.str = ""
    this.titleClick = function(event){
      data.titleClick(event.target.className);
    }
}

function thirdView(){
    this.str = ""
    this.buttonClick = function(event){
      data.deleteNews()
    }
}

var show = {
  showContent : function(data, secondView, thirdView){
    data.getTitle(secondView);
    document.querySelector("nav>ul").innerHTML = secondView.str;

    data.getContent(thirdView);
    document.querySelector(".content").innerHTML = thirdView.str;
  }
}

////////////////////////////////
// Model 객체

function dataModelObj(){
  this.json = [];
  this.cur_index = 0;

}

var dataMethod = {
  deleteNews : function(){
    //show.showContent(data,view2,view3);
  },

  titleClick :function(title){
    for(var i = 0; i<this.json.length; i++){
      if(this.json[i].title===title){
        this.cur_index = i;
        break;
      }
    }
    show.showContent(data,view2,view3);
  },

  navClick: function(destination){
    if(destination==="left"){
      this.cur_index===0 ? this.cur_index=this.json.length-1 : this.cur_index--;
    }else{
      this.cur_index===this.json.length-1 ? this.cur_index = 0 : this.cur_index++;
    }
    show.showContent(data,view2,view3);
  },

  getTitle : function(view){
    view.str = ""
    this.json.forEach(function(val){
        view.str += '<li class="'+val.title+'">{title}</li>'.replace('{title}',val.title);
    })
  },

  getContent : function(view){
    var title = this.json[this.cur_index].title;
    view.str = ""
    this.json.forEach(function(val){
        if(val.title===title){
          var template = document.querySelector("#newsTemplate").innerHTML;
          var newsList = val.newslist.reduce(function(a, b){return a+"<li>"+b+"</li>"},"");
          view.str = template.replace("{title}",val.title).replace("{imgurl}",val.imgurl).replace("{newsList}",newsList);
        }
    })

  },

  setData : function(){
    data.json = JSON.parse(this.responseText)
    show.showContent(data,view2,view3);
  }

}

dataModelObj.prototype = dataMethod;
var data = new dataModelObj();

firstView.prototype= show;
secondView.prototype = show;
thirdView.prototype = show;

var view1 = new firstView();
var view2 = new secondView();
var view3 = new thirdView();

document.addEventListener("DOMContentLoaded", function(){
    sendAjax(data.setData);
});

document.querySelector(".btn .left").addEventListener("click", view1.navClick)
document.querySelector(".btn .right").addEventListener("click", view1.navClick)
document.querySelector("nav>ul").addEventListener("click", view2.titleClick)
document.querySelector("button").addEventListener("click", view3.buttonClick)
