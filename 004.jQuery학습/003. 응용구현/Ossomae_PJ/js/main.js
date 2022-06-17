// 옷소매 갤러리 JS - main.js

///////////////// 로딩구역 ///////////////////////
$(()=>{
    console.log("로딩완료!");

    // 변경대상 : .gbx
    const gbx = $(".gbx");
    // 광클 금지 변수
    let prot =0; // 0 - 허용 , 1 -금지

    // 오른쪽버튼 클릭시 기능 구현 ///////
    $(".rb").click(()=>{

        // 광클금지 /////////
        if(prot) return; //돌아가
        prot =1 ; // 잠금
        setTimeout(()=>prot=0,400);
        /////////////////////////

        clearAuto();
        console.log("오른쪽");
        // 기능 : .gbx의 하위 div 중 첫번째 div를 맨뒤로 이동
        // JS에서 맨뒤추가(이동) appendChild()
        // 제이쿼리는 append()를 사용!
        gbx.append(gbx.find('div').first());
        // find()는 하위자손요소 선택
        // first() 선택요소중 첫번째

    }); ////// click ///////////

    // 왼쪽버튼 클릭시 기능 구현 ///////
    $(".lb").click(()=>{
        // 인터발 지우기 함수 호출
        
        // 광클금지 /////////
        if(prot) return; //돌아가
        prot =1 ; // 잠금
        setTimeout(()=>prot=0,400);
        /////////////////////////

        console.log("왼쪽");
        // 기능 : .gbx의 하위 div 중 마지막 div를 맨앞으로 이동
        // JS에서 맨앞추가(이동) insertBefore(놈,놈놈)
        // 제이쿼리는 prepend()를 사용!
        gbx.prepend(gbx.find('div').last());
        // find()는 하위자손요소 선택
        // last() 선택요소중 첫번째
    }); ////// click ///////////

    // 인터발용 변수
    let autoI;

    // 타임아웃용 변수
    let autoT;

    // 인터발호출 함수 /////////////////
    const autoCall = () => {
        autoI = setInterval(()=>{
            gbx.append(gbx.find('div').first())
        },2000);
    }; ////////// autoCall 함수 //////////

    // 인터발함수 최초호출
    autoCall(); 

    ///// 인터발 지우기 함수 //////////
    const clearAuto = () => {
        console.log('멈춤');
        // 인터발 지우기
        clearInterval(autoI);

        // 타임아웃 지우기 (실행쓰나미방지)
        clearTimeout(autoT);

        // 4초후 다시 
        autoT = setTimeout(autoCall, 4000);
    }; ////////// clearAuto 함수 //////////
});

// window.addEventListener("DOMContentLoaded",()=>{}); 
///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////