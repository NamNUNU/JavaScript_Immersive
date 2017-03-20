# JavaScript_Immersive

## 목차

- Day1(몸풀기) - 20170313  
- Day2(DOM실습) - 20170314  
- Day3(scope/closure/prototype) - 20170315

---

## Commit_Rule

### This is my commit rule  

1. 제목과 본문을 모두 작성하여 commit한다
2. commit -m 옵션을 사용하지 않고 vim등과 같은 에디터를 사용하여 작성한다
3. **일반적인** git 작성 규칙을 사용한다
4. 변경한 내용을 순서에 따라 적는다
5. 목록형으로 작성 가능

~~~
ex)
Update communication Function

1) Add Bluetooth BLE 4.0 service
2) Remove WiFi Module
~~~

### 일반적인 git 작성 규칙

#### 제목  
- 50자를 넘지 않는다  
- 대문자로 시작한다  
- 마침표를 찍지 않는다  
- 제목과 본문사이에 2번째 행은 비워둔다  

#### 본문   
- 72자를 넘지 않는다  
- 명령형 어조를 사용한다(동사로 시작되며 현재형)  
- 명시적으로 사용한다  

### 커스텀 규칙

#### 제목
- Update : 폴더 단위 파일 변경
- Add : 파일이나 기능 추가
- Remove : 파일이나 기능 제거
- Modify : 파일이나 기능, 내용 수정

#### 본문
- 1,2,3 등의 개조식으로 표현

---
## Day1(몸풀기) - 20170313

### 실습내용
1) 네이버 모든 메인 페이지 div 태그 중에 class name에 '-'나 언더바가 들어가는 태그의 개수를 출력하는 함수를 만들어보자   

2) 1번 함수를 이용하여 section태그에 '-'나 언더바가 들어가는 태그의 개수를 출력하는 함수를 만들어보자   

3) 정규표현식의 test함수를 이용해보자  

4) div 태그에 위와 같은 규칙이 적용되는 태그가 있는 경우 그 css클래스를 제거해 보자  

---
## Day2(DOM 실습) - 20170314

### 실습내용
1) Ajax를 이용하여 JSON 값을 받아온다   

2) 네이버 메인의 뉴스 처럼 카테코리 클릭시 컨텐츠가 보이는 뷰를 만든다   

3) 좌우 네비게이션 버튼과 x로 구독을 해지하는 기능을 추가한다  

4) 하이라이트 기능을 추가한다

---
## Day3(scope/closure/prototype) - 20170315

### 파일 목록
  *  ClosureTest - 클로저 예제 테스트
  *  ObjectTest -  일반 객체와 생성자 객체/new를 사용하여 객체 생성, prototype을 사용하여 function에 접근/new이외의 객체 사용법들
  *  TodoList -  prototype에서 배운 내용을 활용하여 todo list를 작성, prototype을 생성하는 다른 함수를 사용하여 todo list를 refactoring
  *  TodoListUi -  Todo List를 html을 이용하여 브라우저에서 출력되도록 작성

### 실습내용
1) scope - var, let, const 등  

2) closure - 함수가 종료된 후에도 부모 함수에 접근해서 변수를 사용할수 있다 (function scope의 한계를 극복하게 만드는 기능)

3) prototype - 메모리 오버헤드 방지, 자바의 static과 유사한 개념(?), 객체 내부의 share 가능한 function을 만든다. 상속의 개념과도 닿아있음

### 이론
#### 클로저(Closure)
: 외부함수의 변수에 접근할수 있는 외부함수를 일컬으며, 스코프 체인(scope chain)으로 표현되기도 한다.  
이에 따른 부수효과로는 외부함수가 리턴 된 다음에도 외부함수의 변수에 접근할수 있다는 것이다. 아래 코드를 보자.


기본 예제  
~~~
function showName(firstName, lastName) {
    var nameIntro = "Your name is ";
    function makeFullName() {
        return nameIntro + firstName + " " + lastName;
    }
    return makeFullName();
}
var name = showName("Michael", "Jackson"); // Your name is Michael Jackson
name();
~~~

showName 함수가 실행되면 makeFullName을 리턴하게 된다. 이때, return 되는 값은 makeFullName함수의 몸체이다. 따라서 함수 몸체를 다시 실행해줘야 내부의 함수가 실행된다.  
여기서 주목할 점은 자바 스크립트의 스코프는 변수를 찾을 때 내부에서 외부로 뻗어나간다는 것이다. 변수값이 내부함수에 없을때 외부함수까지 스코프가 확장됨으로 외부함수의 변수를 끌어와 사용이 가능하게 된다.

---

## Day4(MVC pattern) - 20170316

### 파일목록  
  * data - data로 사용되는 json 파일
  * main.css - 뉴스 리스트 css 파일
  * main.html - 뉴스 리스트 html 파일
  * main.js - 뉴스 리스트 js 파일(->이 파일을 수정함)  

### 실습내용
1) day2에서 제작한 뉴스 리스트를 object와 prototype을 적용한 MVC 패턴으로 만들어 본다

---

## Day5(MVC pattern, refactoring) - 20170317

### 실습내용
1) day4에서 만든 MVC패턴 뉴스 리스트를 리팩토링

### 이론
#### 네임 스페이스  

~~~
var = namespace ={};

namespace.model = {};
namespace.view = {};
namespace.controller = {};
~~~  

namespace.model.fistView~~~ 이런식으로 접근한다. 이럴 떄 namespace안에 다 들어가있으므로 접근과 관리가 용이하다.

#### private 변수를 가진 객체 생성

~~~

var dataObjFn = (function() {

   var json = ["aaaa"];

   function dataModelObj() {

   }

   dataModelObj.prototype = {
       getName : function() {
           return json;
       }
   }

   return dataModelObj;

})();

var dd = new dataObjFn();

~~~

클로저를 이용하여 객체를 생성한다.
