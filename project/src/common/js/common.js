/* login.html */
$(document).ready(function(){
    $("#iptId, #iptPw").keyup( function() {
        $(this).next("button").show();
    });

    $(".resetBtn").click(function(){
        $(this).parent("div.id").find("input").val("");
        $(this).hide();
    })

    $(".eyeBtn").click(function(){
        if($(this).hasClass("see")){
            $(this).removeClass("see");
            $(this).addClass("masking");
            $(this).parent("div.pw").find("input").attr("type","text");
        }else{
            $(this).removeClass("masking");
            $(this).addClass("see");
            $(this).parent("div.pw").find("input").attr("type","password");
        }
    })

    $(".pw input").focusout(function(){
        var pw = $(this).val();
        if(!pw) {
            $(this).next("button").removeClass("masking");
            $(this).next("button").addClass("see");
            $(this).next("button").hide();
            $(this).attr("type","password");
        }
    })
});

/* personalInfo.html */
$(document).ready(function(){
    $(".dropdownCase button").click(function(){
        var ddBox = $(this).next("div");
        if($(this).hasClass("activeSel")){
            $(ddBox).slideUp("fast");
            $(this).removeClass("activeSel");
        }else{
            $(".dropdownCase button").next("div").slideUp("fast");
            $(".dropdownCase button").removeClass("activeSel");
            $(ddBox).slideDown("fast");
            $(this).addClass("activeSel");
        }
    })

    //드롭다운 옵션 선택 시
    $(".dropdownCase > div ul li a").click(function(){
        var txt = $(this).text();
        var btn = $(this).parents(".dropdownCase").find("button");
        var box = $(this).parents(".dropdownCase").find("div");
        $(".dropdownCase > div ul li").removeClass("active");
        $(this).parent("li").addClass("active");
        $(box).slideUp("fast");
        $(btn).removeClass("activeSel");
        $(btn).text(txt);
    })
});


/* dolbom 폴더 common.js */
$(document).ready(function(){
    // 탑메뉴 버튼
    $(".go-top").on('click',function(){
        $("html, body").stop().animate({
            scrollTop: 0
        }, 600);

        return false;
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() < $(document).height() - $(window).height() - $(".lyt-footer").outerHeight() + 37) {
            $(".lyt-top-btn").addClass('fix');
        } else {
            $(".lyt-top-btn").removeClass('fix');
        }

        if ($(window).scrollTop() < $(window).height()/2) {
            $(".lyt-top-btn").addClass('hide');
        } else {
            $(".lyt-top-btn").removeClass('hide');
        }
    });

    //GNB 동작
    $(".lyt-header .hambuger").click(function(){
        $("body").css("overflow-y", "hidden");
        $(".lyt-header").addClass("nav-view");
    })

    $(".lyt-header .btn-close").click(function(){
        $("body").css("overflow-y", "auto");
        $(".lyt-header").removeClass("nav-view");
    })

    $(".lyt-header .mob-dim").click(function(){
        $("body").css("overflow-y", "auto");
        $(".lyt-header").removeClass("nav-view");
    })

    // 미디어쿼리
    var pVer = window.matchMedia("screen and (max-width: 1279px)");
    var tVer = window.matchMedia("screen and (max-width: 767px)"); //스와이퍼 start 경계

	pVer.addListener(function(e) {
		if(e.matches) {
            console.log('데스크탑 미만 화면 입니다.');
            
		} else {
            console.log('데스크탑 화면 입니다.');
            // GNB
            $("body").css("overflow-y", "auto");
		}
	});

    // 돌봄찾기 지도 전체보기 선택
    $(".cpt-map .btn-allview").click(function(){
        $(".region-unit").removeClass("rgnOn");
        $(".cpt-map .map-img").toggleClass("allOn");
    })

    // 돌봄찾기 지도 지역별 선택
    $(".cpt-map .region-name").click(function(){
        $(".cpt-map .map-img").removeClass("allOn");
        $(".region-unit").removeClass("rgnOn");
        $(this).parent(".region-unit").addClass("rgnOn");
    })


    //레이어팝업 닫기
	$(".lyt-popup .dim").click(closePop);
	$(".lyt-popup .btn-close").click(closePop);


    //돌봄소개
    $(".com-tabmenu.scrolling .tab a").click(function(e){
        event.preventDefault();
        var idx=$(this).parent(".tab").index();
        var scrT=$(".cpt-infomation").find(".scr0"+idx).offset().top;

        $(".com-tabmenu .tab").removeClass("on")
        $(this).parent(".tab").addClass("on")
        $("html").animate({"scrollTop":scrT - 150},500);
    })

    //돌봄센터 상세페이지
    //이미지 선택
    $(".cpt-dolbom-info .center-imgs .img-group .item").click(function(){
        var crtImg = $(this).find("img").attr("src");
        $(".cpt-dolbom-info .center-imgs .big-img").attr("style","background: url(" + crtImg + ") center no-repeat;")
        $(".cpt-dolbom-info .center-imgs .big-img").find("img").attr("src",crtImg);
        $(".cpt-dolbom-info .center-imgs .img-group .item").removeClass("viewing");
        $(this).addClass("viewing");
    })

    //이미지 삭제
    $(".cpt-dolbom-info .center-imgs .btn-delete").click(function(){
        var adFile = '<input type="file" id="uploadBtn1" class="uploadBtn"><label for="uploadBtn1" class="btn-file">이미지 업로드</label>'
        
        $(this).prev("img").remove();
        $(this).parent(".imgBox").attr("style","");
        $(this).parent(".item").addClass("filing")
        $(this).parent(".item").append(adFile)
        $(this).remove();
    })

    //https://codepen.io/feeva/pen/ApneC

    //이미지 리사이징
    if(document.currentScript === undefined){
        // IE 에서만 돌아갈 내용
        $(".imgBox img").css({"opacity":0});
    }
    
})

//레이어팝업 열기
function openPop(name) {
	$("#"+name).addClass("open-pop")
}

//레이어팝업 닫기
function closePop() {
	$(this).parents(".lyt-popup").removeClass("open-pop")
}


/* 팝업 javascript */
// Popup Open
function popOpen(popId){
    let thispop = document.querySelector("#" + popId);
    const body = document.querySelector("body");

    thispop.classList.add("popOpen");
    body.style.overflow = 'hidden';

}

// Popup Close
function popClose(popId){
    let thispop = document.querySelector("#" + popId);
    const body = document.querySelector("body");

    thispop.classList.remove("popOpen");
    body.style.overflow = 'auto';
}


