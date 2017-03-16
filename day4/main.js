var current_title = "";   // 현재 content 값을 저장하는 variable
var data = new dataModelObj();

var view1 = new firstView();
var view2 = new secondView();
var view3 = new thirdView();


// Ajax 요청 function
function sendAjax(func) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func);
    oReq.open("GET", "./data/newslist.json");
    oReq.send();

}

var show = {
  showContent : function(data, secondView, thirdView){
    data.getTitle(secondView);
    document.querySelector("nav>ul").innerHTML = secondView.str;

    data.getContent(thirdView);
    console.log(thirdView.str);
    document.querySelector(".content").innerHTML = thirdView.str;
  }
}

function firstView(){
    this.str = ""
}

function secondView(){
    this.str = ""
}

function thirdView(){
    this.str = ""
}

function dataModelObj(){
  this.json = [];
  this.cur_index = 0;

  this.delete = function(){

  }

  this.getTitle = function(view){
    this.json.forEach(function(val){
        view.str += "<li>{title}</li>".replace("{title}",val.title);
    })
  }

  this.getContent = function(view){
    var title = this.json[this.cur_index].title;
    this.json.forEach(function(val){
        if(val.title===title){
          var template = document.querySelector("#newsTemplate").innerHTML;
          var newsList = val.newslist.reduce(function(a, b){return a+"<li>"+b+"</li>"},"");
          view.str = template.replace("{title}",val.title).replace("{imgurl}",val.imgurl).replace("{newsList}",newsList);
        }
    })

  }

  this.setData = function(){
    console.log("first data")
    data.json = JSON.parse(this.responseText)
    console.log(data.json);

    show.showContent(data,view2,view3);
  }

}

document.addEventListener("DOMContentLoaded", function(){
    sendAjax(data.setData);
});
