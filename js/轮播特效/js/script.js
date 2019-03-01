//封装一个代替getElementById()的方法
function byId(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
}
//全局变量
var index = 0,
  timer = null,
  pics = byId("banner").getElementsByTagName("div"),
  len = pics.length,
  dots = byId("dots").getElementsByTagName("span"),
  prev = byId("prev"),
  next = byId("next"),
  menu = byId("menu-content"),
  menuItems = menu.getElementsByClassName("menu-item"),
  subMenu = byId("sub-menu"),
  innerBox = subMenu.getElementsByClassName("inner-box");

function slideImg() {
  var main = byId("main");
  //划过清除定时器,离开继续
  main.onmouseover = function () {
    if (timer) clearInterval(timer);
  };

  main.onmouseout = function () {
    timer = setInterval(function () {
      index++;
      index = index % 3;
      changeImg();
      console.log(index);
    }, 1000);
  };
  //自动触发onmouseout
  main.onmouseout();

  //点击圆点切换图片
  for (var i = 0; i < len; i++) {
    dots[i].id = i;
    dots[i].onclick = function () {
      index = this.id;
      changeImg();
    };
  }

  //下一张
  next.onclick = function () {
    index++;
    //index=index%3;
    if (index >= len) index = 0;
    changeImg();
  };
  //上一张
  prev.onclick = function () {
    index--;
    if (index < 0) index = len - 1;
    changeImg();
  };

  //导航菜单
  //遍历主菜单,且绑定事件
  for (var m = 0; m < menuItems.length; m++) {
    //给每一个menu-item定义data-index属性,作为索引
    menuItems[m].setAttribute("data-index", m);
    menuItems[m].onmouseover = function () {
      subMenu.className = "sub-menu";
      var idx = this.getAttribute("data-index");
      //遍历所有子菜单,将每一个都隐藏
      for (var j = 0; j < menuItems.length; j++) {
        innerBox[j].style.display = "none";
        menuItems[j].style.background = "none";
      }
      menuItems[idx].style.background = "rgba(0,0,0,0.1)";
      innerBox[idx].style.display = "block";
    };
  }
  menu.onmouseout = function () {
    subMenu.className = "sub-menu hide";
  };
  subMenu.onmouseover = function () {
    this.className = "sub-menu";
  };
  subMenu.onmouseout = function () {
    this.className = "sub-menu hide";
  };
}
//切换图片
function changeImg() {
  //遍历banner下所有的div及dots下所有的span,将div隐藏,span清除
  for (var i = 0; i < len; i++) {
    pics[i].style.display = "none";
    dots[i].removeAttribute("class");
    //dots[i].className="";
  }
  //根据index索引找到当前div和当前span,并将其显示出来和设为当前
  pics[index].style.display = "block";
  dots[index].className = "active";
}
slideImg();