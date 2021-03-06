// 보그 JS 카테고리 페이지 JS -category.js

// 객체로 만들어진 데이터파일을 별도의 파일로 만든것을
// 제이슨(JSON)이라고 한다!
// 제이쿼리에서 제이슨 파일을 불러와서 변수에
// 할당하여 사용할 수 있다!!
// 제이슨 위치 : js/cat.json

// 제이쿼리 제이슨 가져오기 메서드
// $.getJSON(파일경로,함수)
// $.getJSON(파일경로,(변수)=>{})
// -> 함수의 변수는 제이슨파일의 데이터를 전달함!
// 제이슨 파일경로로 불러오고 함수에서 내가 쓸 변수에 
// 할당한다!

// 참고) 자바스크립트는 제이슨을 쓰려면 js파일처럼 json도
// html페이지에서 <script src="제이슨파일"> 이런식으로 불러옴
// 코드에서 JSON.parse(변수) 제이슨 변환메서드를 사용해 코딩함!

// 제이슨 객체 데이터 할당변수
let sinfo; 
// 제이슨 데이터 연결하여 할당하기!
$.getJSON('js/cat.json',jdata=>sinfo=jdata);
// jdata는 아무이름이어도 상관없다!
// 중요한 것은 getJSON() 메서드에서 제이슨파일 내부의 
// 데이터를 하나의 변수에 담아 전달하고 있다는 점이다!

///// 각 서브별 데이터 셋팅하기 /////


// URL로 넘어온 파라미터 전달값 받기 ///
// GET방식으로 넘어온 (키=값) 쌍을 받는다!
// 변수 = location.href -> url값을 읽어옴!
let pm = location.href;
// 현재 파라미터값만 필요하므로
// 물음표(?)로 잘라서 뒤에 것 -> [1]
// 이퀄(=)로 잘라서 뒤에 것 -> [1]
pm = pm.split('?')[1].split('=')[1];
pm = decodeURIComponent(pm);
console.log(decodeURIComponent(pm));

$(()=>{///////////// JQB////////////

    // 1. 해당 카테고리의 데이터 셋업
    const data = sinfo[pm];
    console.log(data);

    // 2. 데이터 페이지 바인딩하기 ////
    // (1) 타이틀 넣기
    $(".stit").text(data['제목']);

    // (2) .cont에 카테고리 클래스 넣기(배경이미지나옴)
    // -> "경로"데이터로 클래스명을 줘야함!
    // 대상 : .cont
    $('.cont').addClass(data['경로']);

    // (3) LNB 메뉴 셋팅하기
    // "메뉴" 데이터로 값이 "없음"이 아닐 경우
    // 메뉴수만큼 ul>li>a의 구조로 메뉴를 구성함!
    let menu = data['메뉴'];
    console.log("메뉴:",menu);
    // 대상 : .lnb
    let lnb = $(".lnb");

    // 임시코드변수(ul>li>a담을변수)
    let hcode = ""; //string 명시

    // 분기 : 조건 - 데이터가 "없음"인가?
    if(menu==="없음") lnb.remove();
    else { // 메뉴 만들기
        hcode += "<ul>";
        
        //메뉴 배열만큼 코드 만들기!
        // 배열 forEach()문에서 함수전달값이 하나이면 
        // 그것은 바로 배열값이다!! val변수가 배열값
        menu.forEach(val=>{

            hcode += "<li>";
            hcode += `<a href="#">${val}</a>`;
            hcode += "</li>";

        }); ///// forEach /////////

        hcode += "</ul>";

        // 코드넣기
        lnb.html(hcode);

    } ///// else //////

    // (4) 각 컨텐츠박스 타이틀 넣기
    // 대상 : .cbx h2
    // 데이터 : "타이틀"의 배열
    // each((순번,요소자신)=>{코드})
    $(".cbx h2").each(
        (idx,ele)=>$(ele).html(data['타이틀'][idx]));
        // data['타이틀'][배열순번]
        // 배열순번 === h2요소순번 === idx

    // (5) 타이틀 변경하기
    // 대상 : title 태그
    // 데이터 : "제목" 값
    $("title").prepend(data['제목']);

    // prepend() : 앞에 데이터추가(기존데이터살아있음!)
    // 참고) append() : 뒤에 데이터 추가(기존데이터살아있음!)

}); ///////////////////////// JQB//////////////