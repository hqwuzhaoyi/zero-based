$.fn.addDate = function () {
    var ui = $(this);
    var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    ui.empty();
    var pageCount = 7,
        currentPages = 0,
        days = pageCount * 7,
        date = new Date(),
        time = date.getTime();


    for (var i = 0; i < days; i++) {
        var _t = time + i * 86400 * 1000;
        var _d = new Date(_t);
        var html = [];
        var w = week[_d.getDay()]; //星期几
        var y = _d.getFullYear(); //几几年
        var m = _d.getMonth() + 1;
        var d = _d.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        html.push('<div class="schedule_box_item"><div class="date">' + w + '<br>' +
            y + '-' + m + '-' + d + '</div>');
        html.push('<div class="status"></div>');
        html.push('<div class="status status_full">约满</div>');
        html.push('<div class="status"></div></div>');
        ui.append(html.join(''));

    }


}

$.fn.transitionLR = function () {
    var ui = $(this);
    var leftBtn = $(".schedule_tool_left").children(".date");
    var rightBtn = $(".schedule_tool_right").children(".date");
    var width = 658;
    var current = 0;
    leftBtn.on("click", function () {

        if (current > 5) current = 5;
        current++;
        ui.triggerHandler("move_to", current);

    });
    rightBtn.on("click", function () {

        if (current <= 0) current = 1;
        current--;
        ui.triggerHandler("move_to", current);

    });
    ui.on("move_to", function (evt, i) {
        ui.css("left", width * i * -1);
    });
}
$(function () {
    $("#schedule_box_wrap").addDate();
    $("#schedule_box_wrap").transitionLR();
});