// 제이쿼리 기본 JS - main.js 

// html 태그 로딩후 호출!
$(() => loadFn());

/* *******************************************
    함수명 : loadFn
    기능 : 로딩후 실행함수
************************************* */
function loadFn() {
    console.log("로딩완료!");

    /* *************************
        1. 대상선정 변수할당
    ************************ */
    // 대상1. 버튼들 - .btns>button
    const btns = $('.btns>button');
    // console.log(btns);

    // 대상2 : 미니언즈 - .mi
    const mi = $('.mi');
    // console.log(mi);

    // 대상3 : 빌딩각방 - .building li
    const bd = $('.building li');
    // console.log(bd);

    // 대상4 : 메시지박스 - .msg
    const msg = $('.msg');
    // console.log(msg);

    // 삽입이미지 변수셋팅
    // 좀비 이미지 태그 
    const mz1 = '<img src="images/mz1.png" alt="좀비1" class="mz">';
    const mz2 = '<img src="images/mz2.png" alt="좀비2" class="mz">';
    const zom = '<img src="images/zom.png" alt="좀비들" class="mz">';
    // 주사기
    const inj = '<img src="images/inj.png" alt="주사기" class="inj">';

    // 미니언즈 left 위치 보정값
    // 빌딩 li 크기의 절반 - 미니언즈 크기 절반
    const addL = bd.eq(0).width() / 2 - mi.width() / 2;
    // console.log("미니언즈 위치 조정값:",addL);
    // width() 가로크기, height() 세로크기
    //  -> 단위없는 px 숫자값 리턴함!

    /* *************************
         2. 초기화셋팅
     ************************ */
    // 2-1. 버튼셋팅 : 모든 버튼 숨기고 첫번째만 보이기
    btns.hide().first().show();
    // 버튼들.숨겨().첫번째().보여()

    // 테스트용 버튼설정
    // btns.hide().last().show();

    /* 
        -제이쿼리 단순/숨김 메서드
        hide() - 숨김/ show() - 보임
        -> 제이쿼리 메서드에 시간을 쓰면 애니메이션됨!
        hide(시간)/ show(시간)
        -> 애니메이션시 이징(가속도),callback 함수 사용가능
        hidc(시간,이징,함수) / show(시간,이징,함수)
        ___________________________________________

        이런종류의 제이쿼리 메서드들
        1. show() / hide()
        -> toggle() - show/hide 전환
        2. fadeIn() / fadeOut() - 서서히 나타남/숨김
        ->fadeToggle() - fadeIN/fadeOut 전환
        3. slideDown() / slideUp() - 아래위로 나타남/숨김
        -> slideToggle() - slideDown/slideUp 전환

        [공통] 소괄호안에 값으로 (시간,이징,함수)를 사용!
        시간 - 1/1000초 (단위없이 숫자만씀)
        이징 - 가속도(제이쿼리용 이징이 따로있음)
        함수 - 애니메이션 후 실행함수(콜백함수)

    */

    // 2-2. 빌당숫자셋팅 : 
    // -> 모든 빌딩 li를 순서대로 돌면서
    // 순번넣기 + 좀비넣기
    // 대상 : 빌딩 li -> bd변수
    bd.each((idx, ele) => {
        // console.log(idx);

        // 1. 각 li요소에 글자넣기(순번)
        $(ele).text(idx);
        // $(ele).innerText = ""; -> 섞어쓰면 안됨!

        // 2. 좀비+주사기 넣기
        // append(요소) - 선택요소 내부에 맨뒤추가
        if (idx === 9) $(ele).append(mz1);
        else if (idx === 7) $(ele).append(mz2);
        else if (idx === 1) $(ele).append(zom);
        else if (idx === 2) $(ele).append(inj);
        
            }); ////// each ////////////////////

        /* 
            [ for문을 사용하지 않고 돌게해주는 
            제이쿼리 메서드 ]
            >>>> each(function(idx,ele){구현코드})
            >>>> each((idx,ele)=>{구현코드})
     
            - 선택요소 순서대로 돌면서 구현코드를 실행함
            - idx 첫번째 전달변수는 순번이 전달됨(0부터)
            - ele 두번째 전달변수는 요소자신
            - (this 키워드와 동일 - 단, 화살표함수에서는 다름!)
            - 전달변수는 순서와 개수가 중요함!
            - 이 메서드를 사용하면 for문을 안써도 됨!
     
        */

    // 2-3. 모든 좀비 숨기기
    $('.mz').hide();
    // 선택요소가 여러개이면 for문없이 모두 셋팅됨!

    /* ***********************************
        3. 버튼별 클릭 이벤트 함수 만들기
        ***************************************/

    //////////////////////////////////////////////////////////
    /////  버튼 클릭시 공통 기능함수 //////////////////////////
    /////////////////////////////////////////////////////////

    const miniAct = (ele, seq, call) => {
        // ele - 호출하는 버튼 자신(this키워드값 받음)
        // seq - 이동할 빌딩 li 순번
        // call - 이동 후 콜백함수


        // 1. 클릭된 요소 자신 없애기
        $(ele).slideUp(300);
        // slideUp(시간,이징,함수)   
        // -> height값이 0되며 애니메이션
        // 애니메이션 후 display:none
        // 반대는 slideDown(시간,이징,함수)

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간,이징,함수)
        // ->opacity가 0이 되며 애니메이션
        // 애니메이션 후 display:none됨
        // 반대는 fadeIn(시간,이징,함수)

        // 3. 이동위치정보
        // 이동할 빌딩 li의 위치를 알아내기
        // 이동할 li타겟 -> bd변수
        let tg = bd.eq(seq); //seq - li 순번
        // eq(순번) -> 선택요소들 중 몇번째 요소를 선택
        // eq는 sequence(순서)라는 단어에서 나온말

        // 화면에서의 top값
        let tgtop = tg.offset().top;
        // 화면에서의 left값 + 미니언즈 위치보정값
        let tgleft = tg.offset().left + addL;

        // console.log("top:",tgtop,"/left:",tgleft);

        /* 
            offset() 메서드
            - 기준 : 윈도우 화면
            - 요소의 위치나 크기 정보를 담고 있음
            offset().top -> 요소의 top값
            offset().left -> 요소의 left값
            ______________________________________

             position() 메서드
            - 기준 : 포지션이 있는 부모박스
            - 요소의 위치나 크기 정보를 담고 있음
            position().top -> 요소의 top값
            position().left -> 요소의 left값
        */

        // 4. 미니언즈 이동하기
        // 대상 : .mi -> mi변수
        mi.animate({
            top: tgtop + "px",
            left: tgleft + "px"
        }, 800, "easeOutElastic", call);
        // call -> 전달받을 콜백함수

        // animate({CSS설정},시간,이징,함수)
        // -> CSS 변경을 애니메이션 해주는 메서드
        // -> 트랜지션 설정 불필요!(하면안됨!!)
        // -> 만약 시간설정을 안하면 기본값 400적용됨(0.4초)

        /* 
            제이쿼리 이징(easing) : 가속도
            - 애니메이션 할 경우 가속도를 다채롭게 설정함
            - CSS보다 많은 옵션이 있음!
            -> 이징 참고 페이지: (구글에서 easing검색!)

            1)Easing 함수 치트 시트
            https://easings.net/ko
            2)제이쿼리 UI 사이트 이징설명
            https://jqueryui.com/easing/
            제이쿼리에서 설명한 이징페이지
            https://api.jqueryui.com/easings/

            -> 이징을 적용하려면 우선 제이쿼리 라이브러리
            아래에 제이쿼리 UI가 불러와 있어야 사용가능함!

            -> 이징명이 틀리면 적용되지 않는다!
            (참고사이트에서 정확한 이징명을 복사해서 쓰자!)
        */


    }; //////////// miniAct 함수 ///////////

    // 3-1. "들어가기" 버튼 클릭 시작 ////////
    btns.first().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {
                // 1. 메시지 변경
                msg.text("와~! 아늑하다! 옆방으로 가보자!")
                    .fadeIn(200); //메시지 나타나기

                // 2. 다음버튼 보이기
                btns.eq(1).delay(500).slideDown(300);
                // delay(시간)
                // -> 애니메이션 메서드 앞에 사용!
            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 8, callFn);

        })
        // 3-1. "들어가기" 버튼 클릭 끝 /////////

        // 앞에 세미콜론 없이 다음버튼 셋팅이 이어짐!
        // next() 다음 버튼! 
        // 3-2. "옆방으로!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 좀비등장
                bd.eq(9).find(".mz")
                .delay(1000).fadeIn(400,()=>{
                    // 2. 메시지 변경
                    msg.html("악!;;;좀비!<br>어서피하자!")
                    .fadeIn(200)// 메시지나타나기
                    .css({
                        left:"-133%"
                    }); // 박스위치 변경
               

                // this는 현재버튼요소
                // console.log("this의미:",this);

                // 3. 다음버튼 보이기
                $(this).next().delay(500).slideDown(300);
                // delay(시간)
                // -> 애니메이션 메서드 앞에 사용!
            }); //// fadeIn////////

            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 9, callFn);

        })
        // 3-2. "옆방으로!" 버튼 클릭 끝 /////////

        // 3-3. "윗층으로 도망가!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 메시지 변경
                msg.text("여긴 없겠지?")
                .fadeIn(200); //메시지 나타나기

                // 2. 좀비보이기 : 7번방
                bd.eq(7).find(".mz")
                .delay(500).fadeIn(500,"easeInExpo",()=>{
                    // 3. 메시지 수정하기
                    msg.text("악! 여기도!!!");
                    
                    // this는 현재버튼요소
                    // console.log("this의미:",this);
                    // 4. 다음버튼 보이기
                    $(this).next().delay(500).slideDown(300);
                    // delay(시간)
                    // -> 애니메이션 메서드 앞에 사용!
                }); ///// fadeIn 함수 ////////////////



            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 7, callFn);

        })
        // 3-3. "윗층으로 도망가!" 버튼 클릭 끝 /////////

        // 3-4. "다시옆방으로!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {
                // 1. 메시지 변경
                msg.text("여긴 없겠지?.....")
                .fadeIn(200) // 메시지 나타나기
                .delay(1000)
                .fadeOut(100,()=>{ //this의 의미가 달라짐 function쓰면
                    // 2. 메시지 다시 변경하기
                    msg.html("그래도 무서우니까<br>윗층으로 가자!")
                    .fadeIn(200); //메시지 다시 나타나기

                    // this는 현재버튼요소
                    // console.log("this의미:",this);
    
                    // 3. 다음버튼 보이기
                    $(this).next().delay(500).slideDown(300);
                    // delay(시간)
                    // -> 애니메이션 메서드 앞에 사용!
                }); ////////// fadeOut ///////////

            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 6, callFn);

        })
        // 3-4. "다시옆방으로!" 버튼 클릭 끝 /////////

        // 3-5. "무서우니 윗층으로!" 버튼 클릭 시작 /////////
        .next().click(function () {
            
            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {
            // 1.메시지 변경 
            msg.empty() //선택요소 텍스트 지우기
            .delay(500) 
            .fadeIn(200,()=>msg.text("무"))
            .delay(500)
            .fadeIn(200,()=>msg.text("무."))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서"))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서."))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서.워"))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서.워."))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서.워.."))
            .delay(500)
            .fadeIn(200,()=>msg.text("무.서.워..."))
            .delay(500)
            .fadeIn(200,()=>{
                // 2. 좀비달려오기
                // -> 7번방 좀비 : bd.eq(7).find(".mz")
                let tg = bd.eq(7);
                /// 7번방 좀비가...
                tg.find(".mz")
                // 2-1. 윗층으로 올라오기
                    .animate({
                        bottom: tg.height() +"px"
                    }, 500,"easeOutBack")
                // 2-2. 주인공에게 달려오기
                .animate({
                    right : tg.width()*1.2 + "px"
                },2000,"easeOutBounce",
                ()=>{ // 콜백함수 - 물린후 ....
                    // 3. 주인공 사색되기(흑백처리)
                    mi.css({
                        filter : "grayscale(100%)"
                    });
                // 4. 메시지 지우기
                msg.hide();

                // 5. 2초후 좀비되기
                setTimeout(()=>{
                    // 5-1.좀비 이미지변경
                    mi.find("img")
                    .attr("src","images/mz1.png");
                    // attr(속성명,속성값)
                    // -> 속성값 변경 메서드
                    // 비교) JS의 setAttribute()
                    // 참고) 속성값 가져오기는
                    // ->attr(속성명)
                    // 비교) JS의 getAttribute()
                    // 5-2. 좀비 메시지
                    msg.html("나도좀비!!;;;<br>어서 치료주사를!")
                    .css({
                        left: "100%"
                    })// 메시지 위치변경
                    .fadeIn(400); // 메시지 보이기

                // this는 현재버튼요소
                // console.log("this의미:",this);

                // 2. 다음버튼 보이기
                $(this).next().delay(500).slideDown(300);
                // delay(시간)
                // -> 애니메이션 메서드 앞에 사용!
                },2000); /////// 타임아웃 ////////


                }); ///// animate/////////
            
            }); ////// fadeIn /////////
            
            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 4, callFn);

        })
        // 3-5. "무서우니 윗층으로!" 버튼 클릭 끝 /////////

        // 3-6. "치료주사방으로!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 주사기 돌리기
                // 주의 : transform은 animate에서 사용불가!
                // transform은 css로 transtion으로 구현!
                $(".inj").css({
                    transform: "rotate(-150deg)",
                    transition : ".5s ease-out 1s",
                    zIndex:"9999"
                }); ///////// css ///////////////

                // 2. 주사놓은 후(1.5초) 다시 미니언즈2(후유증)
                setTimeout(() =>{
                    // 2-1. 미니언즈 흑백보드 풀기
                    mi.css({
                        filter : "grayscale(0%)"
                    })
                    // 2-2. 새로운 미니언즈 이미지로 변경
                    .find("img").attr("src", "images/m2.png");
                    // 2-3. 주사기 제서하기
                    $(".inj").remove();
                    // remove() 메서드 - 태그삭제하기

                    // 3. 메시지 변경
                    msg.text("치료완료!")
                    .fadeIn(200)
                    .delay(1000).fadeIn(200,()=>{
                        msg.html("이제, 조금만 더<br>가면 탈출이닷!");
                    }); /////// fadeIn //////////////
                    
                    // this는 현재버튼요소
                    // console.log("this의미:",this);
    
                    // 4. 다음버튼 보이기
                    $(this).next().delay(500).slideDown(300);
                    // delay(시간)
                    // -> 애니메이션 메서드 앞에 사용!
                },1500); /////// 타임아웃 ///////

            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 2, callFn);

        })
        // 3-6. "치료주사방으로!" 버튼 클릭 끝 /////////

        // 3-7. "3번방으로!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 메시지 변경
                msg.text("이제 곧 탈출이닷!")
                .fadeIn(200); /// 메시지 보이기

                // this는 현재버튼요소
                // console.log("this의미:",this);

                // 2. 다음버튼 보이기
                $(this).next().delay(500).slideDown(300);
                // delay(시간)
                // -> 애니메이션 메서드 앞에 사용!

            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 3, callFn);

        })
    // 3-7. "3번방으로!" 버튼 클릭 끝 /////////


        // 3-8. "1번방으로!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 메시지 변경
                msg.text("어서 헬기를 타야지!")
                .fadeIn(200); /// 메시지 보이기

                // this는 현재버튼요소
                // console.log("this의미:",this);

                // 2. 다음버튼 보이기
                $(this).next().delay(500).slideDown(300);
                // delay(시간)
                // -> 애니메이션 메서드 앞에 사용!

            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 1, callFn);

        })
    // 3-8. "1번방으로!" 버튼 클릭 끝 /////////
        // 3-9. "헬기를 호출!" 버튼 클릭 시작 /////////
        .next().click(function () {

            // 콜백함수 : 이동후 실행함수 ////
            let callFn = () => {

                // 1. 메시지 변경
                msg.text("도와줘요~!!!")
                .fadeIn(200); /// 메시지 보이기

                // 2. 좀비들 최종추적!!!!
                // ->1번방에 숨겨진 좀비들
                // -> bd.eq(1).find(".mz")
                bd.eq(1).find(".mz") // 좀비들(this)
                .fadeIn(200,function(){ //익명함수니까 주인공~!
                    // 2-1. 좀비들 움직이기
                    $(this) //익명함수의 요소 좀비들 자신
                    .animate({
                        right : $(this).parent().width()*1.3+"px"
                    },5000,"easeInOutQuint");
                    // parent() 선택요소의 부모요소로 올라감!
                    // console.log("this의 부모 :",$(this).parent());

                    // 2-2. 헬기등장
                    $(".heli").animate({
                        left : "20%"
                    },3000,"easeOutBack",function(){ //콜백함수
                        // 3. 주인공이 탄 이미지로 변경
                        $(this).attr("src","images/heli2.png");
                        // 4. 주인공 지우기(헬기에 탔으니까!)
                        mi.hide(); // display :none처리
                    }) //////////// animate ////////
                    // 헬기 애니메이션 이어짐!! 
                    .delay(1000) // 5. 1초기다림
                    .animate({
                        left:"70%"
                    },4000,"easeInOutQuart",
                    function(){ // 끝으로 이동후
                        // 7. 헬기 조종사 좀비이미지
                        $(this).attr("src","images/heli3.png");
                    }) /////////animate //////////
                    // 헬기애니 이어짐!
                    // 8. 아주 천천히 화면 바깥으로 나감
                    .animate({
                        left: "100%"
                    },10000,"easeInOutSine",()=>{
                        // 헬기나간후
                        // 9. 미리지정한 class를 타이틀에 줘서 
                        // 간판이 아래로 2단계 떨어짐
                        // 대상 : .tit
                        let tit = $('.tit');

                        // 1단계 : 간판이 중간떨어짐(.on)
                        tit.addClass("on");

                        // 2단계 : 3초 후 간판떨어짐(.on2)
                        setTimeout(()=>{
                            // 간판클래스 추가
                            tit.addClass("on2");

                            // 10.건물무너짐 클래스 넣기
                            // 대상 : .building
                            // bd변수를 이용해 보자!
                            // bd변수 -> .building li
                            // 한단계 위인 부모로 올라감
                            // parent() -> 부모로 올라감
                            bd.parent().addClass("on");
                        },3000); ////// 타임아웃/////

                    }); ////// animate //////

                }); ///////// fadeIn ///////////


            }; /////// callFn 함수 ///////////////

            // 공통기능함수 호출!
            miniAct(this, 0, callFn);

        })
    // 3-9. "헬기를 호출!" 버튼 클릭 끝 /////////



} ////////////// loadFn //////////////////