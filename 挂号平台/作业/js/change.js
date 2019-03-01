
$.fn.captionFocus = function () {
    var ui = $(this),
        caption = $(".content-caption", ui),
        block = $(".content-block", ui);
        // 标题高亮模块
        block.children(":gt(0)")
        .hide();
    $(".content-caption .item", ui).click(function () {
        $(".content-caption .item", ui).removeClass("item_focus");
        $(this).addClass("item_focus");
        var i = $(this).index();
        block.children().triggerHandler("blockChange", i);
    })
    // 内容切换模块
    block.children().on("blockChange", function (evt, i) {
        block.children()
            .hide()
            .eq(i)
            .show();
    });
}

$.fn.addHref=function(){
    
    $(this).click(function(){
        window.location.href="scheduling.html"; 
    });
}


$(function () {
    // $(".content-block .item").Change();
    $(".content").captionFocus();
    $(".register-list-content .right span").addHref();
})