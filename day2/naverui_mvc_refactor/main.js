var current_title = "";   // 현재 content 값을 저장하는 variable
var json;
var isLeft = true;

document.querySelector(".btn .left").addEventListener("click", leftClickHandler);
document.querySelector(".btn .right").addEventListener("click", rightClickHandler);

sendAjax(firstLoad);

// Ajax 요청 function
function sendAjax(func) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func);
    oReq.open("GET", "./data/newslist.json");
    oReq.send();
}

// 페이지 로드시 첫번째로 실행되는 function
function firstLoad() {
    var str = document.querySelector("#newsTemplate").innerHTML;
    json = JSON.parse(this.responseText);
    current_title = json[0].title;

    json.forEach(function(val) {
        document.querySelector("nav ul").innerHTML += '<li class="' + val.title + '">' + val.title + '</li>';
    });
    resetColor(current_title);
    document.querySelector("nav ul").addEventListener("click", textClickHandler);
    textMake(json);

}

// 화살표 클릭시 처리 함수
function arrowButtonClick() {
    //var str = document.querySelector("#newsTemplate").innerHTML;
    var order = [];
    json.forEach(function(val) {
        order.push(val.title);
    });

    if (isLeft) {
        if(order.indexOf(current_title) === 0){
          current_title = order[order.length - 1]
        }
        else{
          current_title = order[order.indexOf(current_title) - 1];
        }
    } else {
        if(order.indexOf(current_title) === order.length - 1){
          current_title = order[0]
        }else{
          current_title = order[order.indexOf(current_title) + 1];
        }
    }

    textMake(json);
}

// json을 이용하여 template을 완성하는 함수
function textMake(json) {
    resetColor(current_title);
    var str = document.querySelector("#newsTemplate").innerHTML;

    if (json.length === 0) {
        str = "";
        document.querySelector(".content").innerHTML = str
    } else {
        json.forEach(function(val) {
            if (val.title === current_title) {
                str = str.replace("{title}", val.title);
                str = str.replace("{imgurl}", val.imgurl);
                str = str.replace("{newsList}", val.newslist.map(function(val2) {
                    return "<li>" + val2 + "</li>"
                }).join(""))
            }
        });
        document.querySelector(".content").innerHTML = str;
        document.querySelector("button").addEventListener("click", removeClick)
    }
}

// x 버튼 클릭시 동작하는 함수
function removeClick() {
    var str = document.querySelector("#newsTemplate").innerHTML;
    var element = document.querySelector("." + current_title);
    document.querySelector("." + current_title).innerHTML = "";

    for (var i = 0; i < json.length; i++) {
        if (json[i].title !== current_title) {
            continue;
        }
        if (json.length === 1) {
            current_title = "";
        } else if (json[i + 1] !== undefined) {
            current_title = json[i + 1].title
        } else {
            current_title = json[i - 1].title
        }
        json.splice(i, 1)
    }
    textMake(json)
}


function textClickHandler(e) {
    current_title = e.target.className;
    textMake(json);
}

function leftClickHandler() {
    isLeft = true;
    arrowButtonClick();
}

function rightClickHandler() {
    isLeft = false;
    arrowButtonClick();
}

function resetColor(title){
    var liElement = document.querySelectorAll("nav>ul>li");
    liElement.forEach(function(val){
        if(val.innerText === title){
            val.style.color="red";
        }else{
            val.style.color="black";
        }

    });
}
