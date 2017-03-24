var my_news = [];
var current_index = 0;

var ns = {}

ns.util = {
  sendAjax : function(url, fn, type, name){
    var oReq =  new XMLHttpRequest();

    switch (type) {
      case "init":
        method = "get";
        oReq.addEventListener('load',function(){
          var json = JSON.parse(oReq.responseText);
          fn(json)
        })
        oReq.open(method,url);
        oReq.send();
        break;
      case "add" :
        method = "post";
        oReq.open(method,url);
        var data = {news:name}

        data = JSON.stringify(data);
        oReq.setRequestHeader('Content-Type', "application/json")

        oReq.send(data);

        oReq.addEventListener('load',function(){
          my_news = JSON.parse(oReq.responseText);
        })
        break;
      case "mynews" :
        method = "post";
        oReq.open(method,url);
        oReq.send();

        oReq.addEventListener('load',function(){
          var json = JSON.parse(oReq.responseText);
          my_news = json;
          fn(json)
        })
        break;
    }
  }
}

ns.dispatcher = {
  resister : function(fnlist){
    this.fnlist = fnlist;
  },
  emit : function(obj, data){
    this.fnlist[obj.name].apply(null, data);
  }
}

ns.view ={};

ns.view.card = {
  showContent : function(result){
    document.querySelector(".mainArea").innerHTML = "";
    var template = document.querySelector("#cardTemplate").innerHTML;

    result.forEach(function(val){
      template = template.replace("{class}",val.title).replace("{imgurl}", val.imgurl);
    })
    document.querySelector(".mainArea").innerHTML = template;
    document.querySelector(".card").addEventListener("click", function(event){
      var name = event.target.parentElement.className;
      ns.dispatcher.emit({"name":"addNewsList"},[name]);
    })
    document.querySelector("header>ul").addEventListener("click",function(event){
      var name = event.target.className;
      ns.dispatcher.emit({"name":"clickNewsList"},[name]);
    })

  }
}


ns.view.article = {
  showContent : function(result){
    var template = document.querySelector("#newsTemplate").innerHTML;
    var article = result[current_index];
    var news_list = "";
    if(article!==undefined){
      article.newslist.forEach(function(val){
        news_list += "<li>"+val+"</li>"
      })
      template = template.replace("{title}",article.title).replace("{imgurl}", article.imgurl).replace("{newsList}",news_list);
      document.querySelector(".content").innerHTML = template;
    }
  }
}

ns.view.title = {
  showContent : function(result){
    var template = document.querySelector("#newsTemplate").innerHTML;
    var str = ""
    result.forEach(function(val){
      str += '<li class="'+val.title+'">'+val.title+"</li>"
    })
    document.querySelector("nav>ul").innerHTML = str;
    document.querySelector("nav>ul").addEventListener("click",function(event){
      var name = event.target.className;
      ns.dispatcher.emit({"name":"clickNewsTitle"},[name]);
    })
  }
}

ns.controller = {
  join : function(){
    ns.dispatcher.resister({

      "cardNewsChange" : function(result){
        this.cardView.showContent(result);
      }.bind(this),

      "addNewsList" : function(name){
        ns.util.sendAjax('http://127.0.0.1:3000/news',null,"add",name);
      }.bind(this),

      "clickNewsList" : function(name){
        if(name === "allNews"){
          ns.util.sendAjax('http://127.0.0.1:3000/news',function(result){
            ns.dispatcher.emit({"name":"cardNewsChange"},[result]);
          }, "init");
        }else{
          ns.util.sendAjax('http://127.0.0.1:3000/news',function(result){
            ns.dispatcher.emit({"name":"myNewsChange"},[result]);
          }, "mynews");
        }
      }.bind(this),

      "myNewsChange" : function(result){
        document.querySelector(".mainArea").innerHTML = document.querySelector("#mynewsTempatate").innerHTML;
        document.querySelector(".btn").addEventListener("click", function(event){
          if(document.querySelector(".card")===null){
            var name = event.target.parentElement.className;
            ns.dispatcher.emit({"name":"clickButton"},[name]);
          }
        })
        current_index = 0;
        this.titleView.showContent(result);
        this.articleView.showContent(result);
      }.bind(this),

      "clickButton" : function(name){
        if(name==="right"){
          current_index === my_news.length - 1 ? current_index = 0: current_index++;
        }else if(name==="left"){
          current_index === 0 ? current_index = my_news.length-1 : current_index--;
        }
        this.titleView.showContent(my_news);
        this.articleView.showContent(my_news);
      }.bind(this),

      "clickNewsTitle" : function(name){
        var result = []
        for(var i = 0 ; i<my_news.length; i++){
          if(my_news[i].title===name){
            current_index = i;
          }
        }
        this.articleView.showContent(my_news);

      }.bind(this)

    })
  }
}

document.addEventListener("DOMContentLoaded",function(){
  const cardView =  Object.assign(Object.create(ns.view.card),{});
  const articleView =  Object.assign(Object.create(ns.view.article),{});
  const titleView =  Object.assign(Object.create(ns.view.title),{});
  const controller = Object.assign(Object.create(ns.controller),{
    cardView : cardView,
    titleView : titleView,
    articleView : articleView
  });

  controller.join();
  }
)

document.addEventListener("DOMContentLoaded",function(){
  ns.util.sendAjax('http://127.0.0.1:3000/news',function(result){
    ns.dispatcher.emit({"name":"cardNewsChange"},[result]);
  }, "init");
})
