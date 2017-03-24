

var MENU = {
  TOTAL_NEWS : 0,
  MY_NEWS : 1
}

var state = MENU.TOTAL_NEWS;

////////////////////////////////
// View 객체


// second View 객체 생성자 prototype에 들어갈 method
function titleView(){
    this.str = ""
}

var titleShow = {

  showContent : function(obj){
    this.str = remocon.getTitle(obj);
    document.querySelector("nav>ul").innerHTML = this.str;

    remocon.highlight(obj);
  }

}

titleView.prototype = titleShow;

// third View 객체 생성자 & prototype에 들어갈 method
function articleView(){
    this.str = ""
}

var articleShow = {

  showContent : function(obj){
    this.str = remocon.getContent(obj);
    document.querySelector(".content").innerHTML = this.str;

    if(remocon.isEmpty(obj)){
      return ;
    }
    this.addEvent(obj);
  },

  addEvent : function(obj){
    if(obj===data){
      document.querySelector("button").addEventListener("click", remocon.addClick.bind(data, mydata));
    }else{
      document.querySelector("button").addEventListener("click", remocon.deleteClick.bind(mydata));
    }
  }

}

articleView.prototype = articleShow;

////////////////////////////////
// controller 객체

var controllerObj = {

  addClick : function(myNewsObj, event){
    var newsJson = this.getJson();
    var newsIndex = this.getCurrentIndex();
    var title = newsJson[newsIndex].title;
    var myNewsJson = myNewsObj.getJson();

    for(var i = 0; i<myNewsJson.length; i++){
      if(myNewsJson[i].title===title){
        return;
      }
    }
    myNewsObj.addJson(newsJson[newsIndex]);
  },

  //  삭제 버튼을 클릭 했을 때
  deleteClick : function(event){
    this.removeJson(this.getCurrentIndex());
    var json = this.getJson();
    var cur_index = this.getCurrentIndex();

    if(json.length !== 0){
      if(cur_index < 0){
        cur_index = 0;
      }else if(cur_index > json.length - 1){
        this.setCurrentIndex(json.length - 1);
      }
    }

    view2.showContent(this);
    view3.showContent(this);
  },

  // news title을 클릭 했을 때
  titleClick :function(event){
    var title = event.target.className;
    var json = this.getJson();
    var cur_index = this.getCurrentIndex();

    for(var i = 0; i<json.length; i++){
      if(json[i].title===title){
        this.setCurrentIndex(i);
        break;
      }
    }
    view2.showContent(this);
    view3.showContent(this);
  },

  // navigation 버튼을 클릭 했을 때
  navClick: function(event){
    var destination = event.target.parentElement.className;

    var json = this.getJson();
    var cur_index = this.getCurrentIndex();

    if(destination==="left"){
      cur_index === 0 ? this.setCurrentIndex(json.length-1) : this.setCurrentIndex(--cur_index);
    }else{
      cur_index === json.length-1 ? this.setCurrentIndex(0) : this.setCurrentIndex(++cur_index);
    }

    view2.showContent(this);
    view3.showContent(this);
  },

  showClick: function(event){
    this.setCurrentIndex(0);
    document.querySelector("nav>ul").addEventListener("click", remocon.titleClick.bind(this));

    controllerObj.setState(this);
    view2.showContent(this);
    view3.showContent(this);
  },

  setState : function(obj){
    if(obj===data){
      state = MENU.TOTAL_NEWS;
    }else if(obj===mydata){
      state = MENU.MY_NEWS;
    }
  },

  // 기사 제목 받아오기
  getTitle : function(obj){
    if(this.isEmpty(obj)){ return "" }
    var json = obj.getJson();
    var cur_index = obj.getCurrentIndex()+1;
    var str = '<li style="font-weight:bold">'+cur_index+'/'+json.length+'</li><br>'

    json.forEach(function(val){
        str += '<li class="'+val.title+'">{title}</li>'.replace('{title}',val.title);
    })

    return str;
  },


  // 기사 받아오기
  getContent : function(obj){
    if(this.isEmpty(obj)){ return "" }
    var json = obj.getJson();
    var cur_index = obj.getCurrentIndex();
    var title = json[cur_index].title;
    var str = ""

    json.forEach(function(val){
        if(val.title===title){
          var template = document.querySelector("#newsTemplate").innerHTML;
          var newsList = val.newslist.reduce(function(a, b){return a+"<li>"+b+"</li>"},"");
          str = template.replace("{title}",val.title).replace("{imgurl}",val.imgurl).replace("{newsList}",newsList);

          state === MENU.TOTAL_NEWS ? str = str.replace("X","구독") : str = str.replace("X","구독 해제");
        }
    })

    return str;

  },

  // 선택된 title 강조 효과 설정
  highlight : function(obj){
    if(this.isEmpty(obj)){ return }
    var json = obj.getJson();
    var cur_index = obj.getCurrentIndex();
    var title = json[cur_index].title;
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
  isEmpty : function(obj){
    var json = obj.getJson();
    return json.length===0 ? true : false;
  }

}

////////////////////////////////
// Model 객체

// Ajax 요청 function
function sendAjax(obj) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function(){
      var json = JSON.parse(oReq.responseText)
      obj.setData(json)
    });
    oReq.open("GET", "http://127.0.0.1:3000/send_ajax");
    oReq.send();

}


// 데이터 저장 obj
function makeDataObj(){
  var json = [];
  var cur_index = 0;

  function dataModelObj(){

  }

  // 데이터 저장 & getter,setter prototype method
  dataModelObj.prototype = {

    setData : function(jsondata){
      json = jsondata;
      view2.showContent(this);
      view3.showContent(this);
    },

    addJson : function(data_obj){
      json.push(data_obj);
    },

    removeJson : function(index){
      json.splice(index, 1);
    },

    getJson : function(){
      return json;
    },

    setCurrentIndex(index){
      cur_index = index;
    },

    getCurrentIndex : function(){
      return cur_index;
    }

  }

  return dataModelObj;
};

var DataObj = makeDataObj();
var MyDataObj = makeDataObj();

////////////////////////////////
// Init

var data = new DataObj();
var mydata = new MyDataObj();

var view2 = new titleView();
var view3 = new articleView();
var remocon = Object.create(controllerObj);

document.addEventListener("DOMContentLoaded", function(){
    sendAjax(data);
    document.querySelector("nav>ul").addEventListener("click", remocon.titleClick.bind(data));
});

document.querySelector(".btn").addEventListener("click", remocon.navClick.bind(data));
document.querySelector("#totalnews").addEventListener("click", remocon.showClick.bind(data));
document.querySelector("#mynews").addEventListener("click", remocon.showClick.bind(mydata));
