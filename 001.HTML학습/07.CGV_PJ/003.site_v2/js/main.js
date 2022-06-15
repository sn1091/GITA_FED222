//cgv 메인 페이지 JS - main.js

window.addEventListener("DOMContentLoaded",()=>{
    console.log("로드완료")

// 영화 선택 리스트: sml(select Movie List)
let sml = document.querySelectorAll(".mlist ul>li");
console.log("영화선택리스트:",sml);

// 선택요소들의 노드리스트 컬렉션을 모두 click설정함!
for(let x of sml){ // x - 각 li 요소
    x.onclick = ( ) =>{
    // 모든 요소 클래스 "on" 지우기
    for(let z of sml) 
    z.classList.remove("on");

    // 해당요소에 클래스 넣기
    // classList의 메서드 add()
    x.classList.add("on");

    } ///// click /////

} ///// for of //////////

}); //////// load /////////
/**************************************** 
    함수명 : chgMV
    기능 : 영화 예고편 선택하여 플레이하기

****************************************/

function chgMV(vid){ //vid - 동영상아이디
    // 1. 함수 호출 확인
    console.log("바꿔!",vid);

    // 2. 변경 대상 : #screen iframe
    var tg = document.querySelector("#screen iframe");

    // 3. 변경내용 : src속성 재설정하기
    // 선택요소.src = 변경할 값

    tg.src = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&loop=1&playsinline=1`;

}
////////////////// chgMV 함수 /////////////
///////////////////////////////////////////