$(function(){
    $(".top").click(function(){
        $("html,body").animate({scrollTop:0}, 800);
    })

    $(".kxlink").click(function(){
        $(".tan").stop().slideDown(300);
        $(".momo").stop().fadeIn(300);
    })
    $(".clss").click(function(){
        $(".tan").stop().slideUp(300);
        $(".momo").stop().slideUp(300);
    })
})