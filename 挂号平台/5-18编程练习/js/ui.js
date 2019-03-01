//ui-search定义
$.fn.UiSearch = function() {
  var ui = $(this);
  $(".ui-search-select-list", ui).hide();
  $(".ui-search-selected", ui).on("click", function() {
    $(".ui-search-select-list", ui).show();
    return false;
  });
  $(".ui-search-select-list a", ui).on("click", function() {
    $(".ui-search-selected", ui).text($(this).text());
    $(".ui-search-select-list", ui).hide();
    return false;
  });
  $("body").on("click", function() {
    $(".ui-search-select-list", ui).hide();
  });
};

$.fn.UiNav = function() {
  var ui = $(this);
  $(".link", ui).hover(
    function() {
      $(".link", ui).css("background", "#60bff2");
      $(this).css("background", "#1fa4f0");
      return false;
    },
    function() {
      $(this).css("background", "#60bff2");
      return false;
    }
  );
};

$.fn.UiHot = function() {
  var ui = $(this);
  $(".displayall", ui).click(function() {
    if ($(".displayall", ui).text() == "展开全部") {
      $(".content-hot-item", ui).css("display", "block");
      $(".displayall", ui).text("隐藏");
    } else if ($(".displayall", ui).text() == "隐藏") {
      $(".content-hot-item", ui)
        .nextAll(".content-hot-item:gt(1)")
        .hide();
      $(".displayall", ui).text("展开全部");
    }
  });
};


$.fn.UiMenu = function() {
  var ui = $(this);
  var len = $(".content-menu-item > .ima ").length;
  for (var i = 0; i < len; i++) {
    var str = "0px " + -1 * i * 22 + "px";
    $(".content-menu-item > .ima ")
      .eq(i)
      .css("background-position", str);
  }
  $('.content-menu-item').hover(function(){
     var index= $(this).index();
    $(this).children('a').css("color","#fff")
    .end().css({
        "background":"#1ca3fb"
    }).children('.ima').css("background-position",'-22px '+-22*index+'px');    
  },function(){
    var index= $(this).index();
    $(this).children('a').css("color","#000")
    .end().css({
        "background":"#fff"
    }).children('.ima').css("background-position",'0px '+-22*index+'px');    
  });
};


$(function() {
  $(".ui-search").UiSearch();
  $(".ui-nav").UiNav();
  $(".ui-hot").UiHot();
  $(".ui-menu").UiMenu();
  $(".content-menu-item").UiMenu();
});
