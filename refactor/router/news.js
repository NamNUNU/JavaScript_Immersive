var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var json = [
	{
		"title" : "SBS",
		"imgurl" : "http://img.sbs.co.kr/s9/common/sbs_news_logo.gif?_1",
		"newslist" : [
				"[가보니] 가상 경주도 즐기고, 내 손으로 자동차도 만들고",
				"리캡차'가 사라진다",
				"갤럭시S8' 출시? '갤노트7' 처리 계획부터 밝혀야",
				"블로코-삼성SDS, 블록체인 사업 '맞손",
				"[블록체인 톺아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록체인"
		]
	},
	{
		"title" : "MBC",
		"imgurl" : "http://img.imnews.imbc.com/images/2015/MBCNEWS_logo.png",
		"newslist" : [
				"발등 찍은 사드보복···제주 중국인들 일자리 잃을 판",
				"안희정, 당원이 바닥에 집어던진 계란 닦은 이유는",
				"홍준표, 서문시장서 대선 출마 선언···상인들 반응은",
				"박근혜 '골목 성명'과 전두환 '골목 성명'은 닮았다"
		]
	},
	{
		"title" : "KBS",
		"imgurl" : "http://news.kbs.co.kr/resources/images/kbsnews_logo.png",
		"newslist" : [
				"파산 내몰린 의정부경전철, 탐욕에는 제동장치가 없었다",
				"親朴불복 논란에 경선룰 갈등… 한국당 또 쪼개지나",
				"415㎞ '연비괴물'투산ix 수소차, 3만원에 창원~서울 달리고도..",
				"'골드컬러' 갤S8도 출시? 6가지 색상 전면케이스 모습이.."
		]
	},
	{
		"title" : "JTBC",
		"imgurl" : "http://cfile8.uf.tistory.com/image/24052D50579273DD14B8EE",
		"newslist" : [
				"안철수, 당 중재안 수용불가…이러다 정말 또 철수?",
				"금융권 올해 채용 규모 또 줄인다…대졸 취업자 갈 곳 잃어",
				"G6 출시로 스마트폰 유통 시장 모처럼 활짝",
				"대용량 인공지능 플랫폼을 개발자들에게"
		]
	},
	{
		"title" : "ChannelA",
		"imgurl" : "http://blog.donga.com/channel-a/files/2011/09/13182566751315456673.jpg",
		"newslist" : [
				"'사드 반대' DJ·盧 인사, 현직 장관 심판 요구 논란",
				"'가자! 애국보수여' 김진태, 문재인에 大權 도전장",
				"폭행-성인 방송 출연, 그리고 장시호..김동성의 추락",
				"유명 프로야구 선수, 캠프지에서 불륜 발각 망신살"
		]
	},
	{
		"title" : "TV조선",
		"imgurl" : "https://lh4.ggpht.com/x6-lSfHvB_jZFsKXy6XSk8p7TLXMESRGyB6hXvSL8FENPl7BDdgA8kJc-pnm0oZUOb8=w300",
		"newslist" : [
				"세월호 좌측 램프 제거…오늘까지 반잠수선에 옮겨야",
				"세월호 인양, 탄핵후 급진전에 설설설···진실은",
				"긁히고 녹슨 '세월'에···모두가 오열했다",
				"돈도, 경험도… 대선만큼 뜨거운 '선거 알바'"
		]
	},
	{
		"title" : "MBN",
		"imgurl" : "http://www.5day.co.kr/logo/imgs/140704_034955_logo_0157_main.jpg",
		"newslist" : [
				"테러 현장서 직접 구조 나선 英차관",
				"'박근혜 탄핵' 재판관 부인 알고봤더니",
				"유병언 죽음, 끝까지 이상하다했더니",
				"화난 조응천, 검찰 향해 직격탄"
		]
	},
	{
		"title" : "YTN",
		"imgurl" : "http://www.itver.cc/wp-content/uploads/2015/01/YTN-News-Logo-670x300.jpg",
		"newslist" : [
				"조용하던 검찰, 박근혜 구속영장 청구 결국",
				"해수부, 세월호 인양전 램프열린사실 왜 몰랐나",
				"정찰기 일본에 급파한 미국, 북한 수일 내에…",
				"직장인이 가장 바라는 연봉 인상률은 7% 실상은…"
		]
	}
];

var my_news = []

router.get('/',function(req, res){
  res.json(json)
});

router.post('/',function(req, res){
	var title = req.body.news;
	var flag = true;
	if(title!==undefined){
		my_news.forEach(function(val){
			if(val.title===title){
				flag = false
			}
		})
		if(flag){
			json.forEach(function(val){
				if(val.title===title){
					my_news.push(val);
				}
			})
		}
	}

	res.json(my_news);

})

module.exports = router;
