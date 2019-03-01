//ui-search 定义
$.fn.UiSearch = function () {
    var ui = $(this);
    $(".ui-search-select-list").hide();
    $(".ui-search-selected", ui).on("click", function () {
        $(".ui-search-select-list").show();
        return false;
    });
    $(".ui-search-select-list a", ui).on("click", function () {
        $(".ui-search-selected").text($(this).text());
        $(".ui-search-select-list").hide();
        return false;
    });
    $("body").on("click", function () {
        $(".ui-search-select-list").hide();
    });
};

//ui-tab 定义
/**
 * @param {string} header  TAB组件 所有选项卡 全部 .item
 * @param {string} content TAB组件 内容区域 全部.item
 * @param {string} focus_prefix 选项卡高亮样式前缀，可选
 */
$.fn.UiTab = function (header, content, focus_prefix) {
    var ui = $(this);
    var tabs = $(header, ui); //$(子，父）从夫节点中找子节点，就是$(content,$(this))，从DOM中匹配所有此父元素中的content元素。
    var cons = $(content, ui);
    var focus_prefix = focus_prefix || "";

    tabs.on("click", function () {
        var index = $(this).index();
        tabs
            .removeClass(focus_prefix + "item_focus")
            .eq(index)
            .addClass(focus_prefix + "item_focus");
        // $(this).addClass('item_focus');
        cons
            .hide()
            .eq(index)
            .show();
        return false; //return false用在阻止默认行为上 .例如超链接a会有默认的跳转功能 , 所以在绑定点击事件的时候 , 会加上 return false阻止其默认行为
    });
};

//ui-backTop
$.fn.UiBackTop = function () {
    var ui = $(this);
    var el = $('<a href="#0" class="ui-backTop"></a>');
    ui.append(el);

    var windowHeight = $(window).height();

    $(window).on("scroll", function () {
        var top = $(window).scrollTop();
        if (top > windowHeight) {
            el.show();
        } else {
            el.hide();
        }
    });
    el.on("click", function () {
        $(window).scrollTop(0);
    });
};

// ui-slider

// 1.左右箭头控制翻页
// 2.翻页的时候进度点要联动
// 3.翻到第三页的时候，下一页要回到第一页，翻到第一页的时候，同理
// 4.进度点，在点击的时候，需要切换到相应的页面
// 5.没有 进度点击和翻页操作 的时候要进行自动滚动
// 6.滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）
// 7.高级-无缝滚动
$.fn.UiSlider = function () {
    var ui = $(this);
    var wrap = $(".ui-slider-wrap", ui);
    var btn_prev = $(".ui-slider-arrow .left", ui);
    var btn_next = $(".ui-slider-arrow .right", ui);
    var items = $(".ui-slider-wrap .item", ui);
    var tips = $(".ui-slider-process .item", ui);

    // 预定义
    var current = 0;
    var size = items.size();
    var width = items.eq(0).width();
    console.log(width);
    
    var enableAuto = true;

    // 设置自动滚动感应（如果鼠标在wrap中，不要自动滚动）
    ui.on('mouseover', function () {
        enableAuto = false;
    }).on('mouseout', function () {
        enableAuto = true;
    });

    //   具体操作
    wrap
        .on("move_prev", function () {
            if (current <= 0)
                current = size;
            current = current - 1;
            wrap.triggerHandler('move_to', current);
        })
        .on("move_next", function () {
            if (current >= size - 1)
                current = -1;
            current = current + 1;
            wrap.triggerHandler('move_to', current);
        })
        .on("move_to", function (evt, index) {

            wrap.css("left", index * width * -1);debugger;
            tips.removeClass('item_focus').eq(index).addClass('item_focus');
        }).on("auto_move", function () {
            setInterval(function () {
                enableAuto && wrap.triggerHandler('move_next');

            }, 1000);
        }).triggerHandler('auto_move');

    //   操作
    btn_prev.on("click", function () {
        wrap.triggerHandler("move_prev");
    });
    btn_next.on("click", function () {
        wrap.triggerHandler("move_next");
    });
    tips.on("click", function () {
        var index = $(this).index();
        wrap.triggerHandler("move_to", index);
    });
};

// ui-cascading
$.fn.UiCascading = function () {
    var ui = $(this);
    var selects = $('select', ui);

    selects.on('change', function () {
        var val = $(this).val();
        var index = selects.index(this);

        //触发下一个select的更新，根据当前的值
        var where = $(this).attr('data-where');
        where = where ? where.split(',') : [];
        where.push($(this).val());

        selects.eq(index + 1)
            .attr('data-where', where.join(','))
            .triggerHandler('reloadOptions');
        //触发下一个之后的select的初始化（清除不应该的数据项）

        ui.find('select:gt(' + (index + 1) + ')').each(function () {
            $(this).attr('data-where', "")
                .triggerHandler('reloadOptions');
        })


    }).on('reloadOptions', function () {
        var method = $(this).attr('data-search');

        var args = $(this).attr('data-where').split(',');

        var data = AjaxRemoteGetData[method].apply(this, args);


        var select = $(this);

        select.find('option').remove();
        $.each(data, function (i, item) {
            var el = $('<option value="' + item + '">' + item + '</option>');
            select.append(el);
        });

    });
    selects.eq(0).triggerHandler('reloadOptions');
}


//页面脚本逻辑
$(function () {
    $(".ui-search").UiSearch();
    $(".content-tab .block .item").UiTab(
        ".block-caption>a",
        ".block-content>.block-wrap",
        "block-caption-"
    ); //>子元素选择器
    $("body").UiBackTop();
    $(".ui-slider").UiSlider();
    $('.ui-cascading').UiCascading();
});