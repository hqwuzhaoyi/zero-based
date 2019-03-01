window.onload = function () {


    function byId(id) {
        return typeof id === "string" ? document.getElementById(id) : id;
    }
    var index = 0,
        timer = null,
        banner = byId("banner"),
        pics = banner.getElementsByClassName("banner-slide"),
        len = pics.length,
        menu = document.getElementsByClassName("menu")[0],
        menuItems = menu.getElementsByClassName("menu-item");

    //遍历menu下的所有div背景和banner下的所有div选项,将背景隐藏,选项更换样式
    function changeImg() {
        //隐藏图片
        for (var i = 0; i < len; i++) {
            pics[i].style.display = "none";
            menuItems[i].className = "menu-item";
        }
        //根据Index索引分别设置当前样式
        pics[index].style.display = "block";
        menuItems[index].className = "menu-item item-active";
    }

    function slideImg() {
        var main = byId("main");
        //鼠标不在主体切换图片
        main.onmouseout = function () {
            timer = setInterval(function () {
                index++;
                if (index >= len) index = 0;
                changeImg();
            }, 1000);
        }
        main.onmouseout();
        //鼠标在主体上面暂停切换图片
        main.onmouseover = function () {
            if (timer)
                clearInterval(timer);
        }
        //遍历菜单
        for (var j = 0; j < len; j++)
            menuItems[j].id = j;
        //点击menu切换图片
        //遍历menuItems赋予索引
        for (var k = 0; k < len; k++) {
            menuItems[k].id = k;
            menuItems[k].onclick = function () {
                index = this.id;
                changeImg();
            }
        }
    }
    slideImg();
}