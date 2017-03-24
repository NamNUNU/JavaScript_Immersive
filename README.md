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

Module pattern

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

---

## Day6(MVC pattern, refactoring) - 20170320

### 실습 내용

### 이론

#### MVC

  * View - View 자신의 변화에 집중, 다른 View나 접근을 자제
  * Model - 데이터의 getter, setter로 역할 끝. view에 직접적인 접근을 자제
  * Controller - VIEW나 MODEL의 변화에 따라 해야할 일을 등록
  * Dispatcher - 변화가 발생시 미리 가지고 있는 정보를 토대로, 필요한 일을 실행시킴

#### 옵저버 패턴(Observer Pattern)

: View의 이벤트를 등록하여, 호출이 되면 컨트롤러에 알림. MVC간의 결합도를 낮춤

~~~
ns.dispatcher.emit(
  {'type' : "afterMoveButton"}, [direction]
  )
~~~

dispatcher는 'afterMoveButton'이라는 행위에 해당하는, 이미 등록된 콜백 함수를 실행

아래는 dispatcher에 이미 등록된 콜백 함수

~~~
"autoMoveButton" : fucntion(direction){
  const nextOrder = this._getNextOrder(direction);
  this.model.changeCurrentNew(nextOrder);
}.bind(this)
~~~

즉, 어딘가(제 3의 공간)에 콜백함수를 등록하여 사용하는 것이라고 할 수 있다.

---
## Day7(Git) - 20170321

### CSS

#### 웹 디자인의 순서
1. 구조를 잡는다 (배치)  
2. 스타일을 입혀준다

### Git

#### Git review

Git의 가장 작은 저장단위는 commit이다.
commit은 SHA-1으로 인덱싱(id)을 한다.
SHA-1 알파벳으로 16자리로 겹치지 않는 난수를 만들어낸다.
commit은 root을 제외하고 모두 부모가 있다.

#### 저장소
  * 작업 디렉토리 - 사용자가 작업을 하는 공간
  * 인덱스 - stage와 동일,  로컬 저장소로 가기 전의 공간, 준비 구역
  * 로컬 저장소
  * 원격 저장소

#### 프로젝트 설정
  * git config --global --list : 현재 상태를 보여준다
  * git config --global user.name "이름" : 사용자 이름을 변경, "이름"을 생략하면 현재 저장된 이름이 나온다.
  * git config --global
  * git config --global alias."줄인 명령어" "타겟 명령어" : 커스텀 명령어를 설정한다.

#### 명령어

  * git init : 로컬 저장소 생성  
  * git clone : 원격저장소를 로컬저장소로 복사함  
  * git add : work space의 내용을 stage에 업로드  
  * git commit : stage에 내용을 로컬 저장소에 저장, .git 폴더가 생성된다. git 폴더는 로컬 저장소 자체라고 생각하면 된다.  
  * git push :  로컬 저장소의 내용을 원격 저장소에 복사한다.
  * git fetch : 원격 저장소의 내용을 로컬 저장소에 복사한다.
  * git merge : 로컬저장소와 work space의 내용을 합쳐준다. 작업이 끝난후 부모가 2개가 된다.
  * git pull :  fetch + merge이다.
  * git checkout : 로컬 저장소의 내용을 그대로 꺼내온다.
  * git rebase : merge와 반대의 개념, 자신을 들어서 상태방에게 얹어준다. 깔끔해지지만 충돌할 가능성이 높다. 작업이 끝난후 부모가 1개가 된다
  * git cherry-pick : commit 하나를 떼서 붙임, 전체중에서 하나만 가져옴
  * git revert : commit의 흔적을 남기고, 원하는 곳으로 되돌린다.
  * git reset --hard : commit의 흔적을 지우고, 원하는 곳으로 되돌린다.
  * git rebase -i HEAD~ : commit의 순서 조정과 삭제를 마음대로 편집가능
  * git push --set-upstream origin aa : origin을 등록해줌
  * cat .git/config : 현재 git 설정 보기
  * git rm --cached 파일이름 : 해당 파일을 스테이지에서 내림

#### 용어

  * HEAD - 현재 사용하고 있는 브랜치, 주로 스타로 표시를 한다. checkout으로 바뀐다.
  * Branch - 커밋의 주소값을 가지고 있는 값


### 오늘의 팁  - TIL(Today I Learned)
내가 오늘 배운 내용을 커밋한다. 굳이 소스 코드가 아니어도 상관없다.  

#### 의도적 TIL
  * developed by me  
  * 아주 긴 시간을 목표로 잡는다.  
  * 안하는 날도 있을수 있다  
  * 못하면 진도를 누적하지 않는다.  
  * 미션을 주고 달성하도록 노력한다.  


  ---
## Day8(NodeJS) - 2017022

### 오늘의 팁 - 모듈을 제외하고 git에 push 하기
  https://www.gitignore.io/
  에서 원하는 언어를 검색 하여 vim .gitignore 파일을 생성 후, 내용을 복사해주면
  dependancy나 패키지, 모듈을 생략하고 push 해준다

  ---
## Day9(MVC news list with back end) - 2017023
