/**
 * Created by donghyunkim on 2017. 3. 14..
 */

/*


 */

// ajax 부분
var jsonData;
var currentSite = 0;

function reqListener(){
    jsonData = JSON.parse(this.responseText);
    loadPage(jsonData);
    //delegation은 상위 element에 리스너를 걸어주면 하위 자식 노드
    var listUl = document.querySelector(".mainArea>nav>ul");
    listUl.addEventListener("click",listClickHandler);


    var buttonDom = document.querySelector("button");
    buttonDom.addEventListener("click",buttonClickHandler);

    var arrowBtnDom = document.querySelector(".btn");
    arrowBtnDom.addEventListener("click",arrowClickHandler);


}

var oReq = new XMLHttpRequest();

oReq.addEventListener("load",reqListener);


oReq.open("GET","./data/newslist.json");
oReq.send();

//몇번째 li가 눌렸는지 확인 해야한다


//첫번째 로딩 함수
function loadPage(jsonDatas){

    var listTemplate = '<li class="{name}">{name}</li>';
    var listHtmlResult = "";

    jsonData.forEach(function(val){
        listHtmlResult += listTemplate.replace(/{name}/g,val.title);
    });


    var listDom = document.querySelector(".mainArea>nav>ul");
    //console.log(listDom);
    listDom.innerHTML = listHtmlResult;
    //console.log(jsonData);

    if(jsonData.length !== 0) {
        replaceTemplate(jsonDatas[0]);
    }else{
        var contentDom = document.querySelector(".content");
        contentDom.innerHTML = "";
    }

}



//탬플릿을 바꾸어주는 함수

function replaceTemplate(jsonData) {

    var mainTemplate = document.querySelector("#newsTemplate").innerText;
        //console.log(mainTemplate);
    mainTemplate = mainTemplate.replace("{title}", jsonData.title);
    mainTemplate = mainTemplate.replace("{imgurl}", jsonData.imgurl);
    mainTemplate = mainTemplate.replace("{newsList}", jsonData.newslist.map(function (val) {
        return "<li>" + val + "</li>"
    }).join(""));

    var contentDom = document.querySelector(".content");
    contentDom.innerHTML = mainTemplate;

    var buttonDom = document.querySelector("button");
    buttonDom.addEventListener("click", buttonClickHandler);

    highLight();

}

//리스트 클릭 핸들러
function listClickHandler(event){
    var seletedData = jsonData.filter(function(val,idx){
        if( val.title == event.target.innerText) {
            currentSite = idx;
            return true;
        }
    })[0];

    replaceTemplate(seletedData);
}

function highLight(){
  var dom = document.querySelectorAll("nav>ul>li")
  dom.forEach(function(value){
    value.style.color = "black";
  })
  document.querySelector("nav>ul>."+jsonData[currentSite].title).style.color = "blue";
}


//삭제 버튼 클릭 핸들러
function buttonClickHandler(){
    var titleDom = document.querySelector(".newsName");
    for(var i = 0; i<jsonData.length; i++){
        if(jsonData[i].title == titleDom.innerText){
            jsonData.splice(i,1);
            break;
        }
    }
    currentSite = 0;
    loadPage(jsonData);

}

//화살표 클릭 핸들러
function arrowClickHandler(event){

    if(event.target.parentElement.className == "left"){
        if(currentSite > 0){
            
            else{
                currentSite--;
            }
        }
    }else{
        if(currentSite < jsonData.length-1){
            currentSite++;
        }
    }
    if(jsonData.length !== 0){
        replaceTemplate(jsonData[currentSite]);
    }

}
