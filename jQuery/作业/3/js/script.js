$(function () {
    var headUl = $(".head-submenu"),
        headmenu = $(".headmenu");

    // 隐藏header标签
    headUl.hide();

    //显示head下拉菜单
    function headmenuShow() {
        $(this)
            .children("ul")
            .not("#header-no,.headleft")
            .show();
        $(this)
            .not("#header-no,.headleft")
            .css({
                border: "1px solid #eeeeee",
                background: "#fff"
            });
    }
    //隐藏head下拉菜单
    function headmenuHide() {
        $(this)
            .children("ul")
            .not("#header-no,.headleft")
            .hide();
        $(this)
            .not("#header-no,.headleft")
            .css({
                border: "1px solid #f3f5f7",
                background: "#f3f5f7"
            });
    }
    headmenu.hover(headmenuShow, headmenuHide);
    //   logo
    var drapdownLayer = $(".drapdown-layer"),
        cwIcon = $(".cw-icon");
    // 购物车改变颜色
    function colorChange() {
        cwIcon.css({
            background: " #fff",
            color: "red",
            border: " 2px solid #e3e4e5"
        });
        cwIcon.children(".iconfont").css({
            background: 'url("img/icon/25.png") '
        });
        cwIcon.children(".cw-num").css({
            borderLeft: "1px solid #e3e4e5"
        });
    }
    //购物车还原颜色
    function colorReturn() {
        cwIcon.css({
            background: " red",
            color: "#fff",
            border: " 2px solid red"
        });
        cwIcon.children(".iconfont").css({
            background: 'url("img/icon/26.png") '
        });
        cwIcon.children(".cw-num").css({
            borderLeft: "1px solid #eee"
        });
    }

    $(".cw-icon,.drapdown-layer").hover(colorChange, colorReturn);
    // 显示隐藏drapdown layer 购物篮
    drapdownLayer.hide();

    function dlShow() {
        drapdownLayer.show();
    }

    function dlHidde() {
        drapdownLayer.hide();
    }

    $(".cw-icon,.drapdown-layer").hover(dlShow, dlHidde);

    //   购物篮内容悬浮央视改变cartItemInner简称cII
    function cIIChange() {
        $(this).css({
            background: "#f3f5f7"
        });
        $(this)
            .find("a")
            .eq(0)
            .css("color", "red");
    }

    function cIIReturn() {
        $(this).css({
            background: "#fff"
        });
        $(this)
            .find("a")
            .eq(0)
            .css("color", "#000");
    }
    $(".cart_item_inner").hover(cIIChange, cIIReturn);




    // banner区
    var cateMenuIten = $('.cate-menu-item'),
        innerBox = $('.inner-box');
    for (var i = 0; i < cateMenuIten.length; i++) {
        cateMenuIten.eq(i).attr('data-index', i)
        //console.log(cateMenuIten.eq(i).attr('data-index'));
    }
    var idx = null;
    innerBox.hide();
    var i = 10;
    //方法一
    // function navchange() {
    //     // 菜单隐藏
    //     idx = $(this).attr('data-index');
    //     //console.log(idx);
    //     innerBox.eq(idx).show();
    //     innerBox.eq(idx).css("z-index", i++);

    //     // 主菜单悬浮样式
    //     $(this).css({
    //         background: '#fff'
    //     });
    //     $(this).children('p').css('color', 'red');
    //     $(this).mouseleave(function () {
    //         $(this).css({
    //             background: 'red'
    //         });
    //         $(this).children('p').css('color', '#fff');
    //     });
    // }
    // function navreturn() {
    //     innerBox.hide();
    // }
    // $('.cate-menu-item').mouseenter(navchange).parent().parent().
    // mouseleave(navreturn);


    //方法二
    function navchange() {
        // 菜单隐藏
        idx = $(this).attr('data-index');
        //console.log(idx);
        innerBox.eq(idx).show();
        // 主菜单悬浮样式
        $(this).css({
            background: '#fff'
        });
        $(this).children('p').css('color', 'red');
        $(this).mouseleave(function () {
            $(this).css({
                background: 'red'
            });
            $(this).children('p').css('color', '#fff');
            innerBox.eq(idx).hide();
            innerBox.mouseenter(function () {
                innerBox.eq(idx).show();
            });
        });
    }

    function navreturn() {
        innerBox.hide();
    }
    cateMenuIten.hover(navchange, navreturn);
    innerBox.mouseleave(navreturn);

    // 轮播图片
    var sliderImg = $('.slider-img'),
        timer = null,
        sliderIndex = 0;
    //用jquery给每个img标签写图片链接
    sliderImg.each(function (i, n) {
        $(this).attr("src", 'img/focus-carousel/' + ++i + ".jpg");
    });
    sliderImg.not(':first').hide(); //除了第一张图片全部隐藏

    //鼠标离开触发换图片
    $('.focus-main').mouseleave(function () {
        timer = setInterval(function () {
            sliderIndex++;
            changeImg();
        }, 1000);
    });
    $('.focus-main').mouseleave(); //主动触发
    $('.focus-main').mouseover(function () {
        clearInterval(timer);
    });

    // 上下切换按钮
    $('.slider-prev').on('click', function () {
        sliderIndex--;
        changeImg();
    });
    $('.slider-next').on('click', function () {
        sliderIndex++;
        changeImg();
    });
    // 圆点切换
    var sliderIndicatorBtn = $('.slider-indicator-btn');
    for (var i = 0; i < sliderIndicatorBtn.length; i++)
        sliderIndicatorBtn.eq(i).attr('id', i);
    sliderIndicatorBtn.on('click', function () {
        sliderIndex = $(this).attr("id");
        changeImg();
    });

    function changeImg() {
        if (sliderIndex >= sliderImg.length)
            sliderIndex = 0;
        else if (sliderIndex < 0)
            sliderIndex = sliderImg.length - 1;
        sliderImg.hide();
        sliderImg.eq(sliderIndex).show();
        sliderIndicatorBtn.removeClass('active');
        sliderIndicatorBtn.eq(sliderIndex).addClass('active');
    }

    // 楼层区
    // f1
    var mainIndex = 0,
        columnTop = $(".column-top-right>span"),
        cloumnLayer = $('.column-layer'),
        arrowDiv = $('.floor-arrow>div');

    cloumnLayer.hide();
    cloumnLayer.eq(0).show();
    columnTop.eq(0).css('color', 'red');
    columnTop.on('click', function () {
        mainIndex = columnTop.index(this);
        // 头部
        columnTop.css('color', '#999');
        columnTop.eq(mainIndex).css('color', 'red');
        arrowDiv.removeClass('arrow');
        arrowDiv.eq(mainIndex).addClass('arrow');
        // 内容
        cloumnLayer.hide();
        cloumnLayer.eq(mainIndex).show();
    });
    // f2
    var mainIndex2 = 0,
        columnTop2 = $(".column-top-right2>span"),
        cloumnLayer2 = $('.column-layer2'),
        arrowDiv2 = $('.floor-arrow2>div');

    cloumnLayer2.hide();
    cloumnLayer2.eq(0).show();
    columnTop2.eq(0).css('color', 'red');
    columnTop2.on('click', function () {
        mainIndex2 = columnTop2.index(this);
        // 头部
        columnTop2.css('color', '#999');
        columnTop2.eq(mainIndex2).css('color', 'red');
        arrowDiv2.removeClass('arrow2');
        arrowDiv2.eq(mainIndex2).addClass('arrow2');
        // 内容
        cloumnLayer2.hide();
        cloumnLayer2.eq(mainIndex2).show();
    });

    // 顶部按钮
    var backTop=$("#backTop");
    backTop.on('click',function(){
        $(window).scrollTop(0);
    });
});