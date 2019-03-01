$(function () {

  var pic = $('.slide'),
    main = $('.main'),
    prev = $('.prev');
  next = $('.next'),
    button = $('.button'), dots = $('.dots>span');


  index = 0, timer = null;
  pic.css('display', 'none');
  pic.eq(0).css('display', 'block');

  function slide() {
    //切换图片
    main.on('mouseout', function () {
      timer = setInterval(function () {
        index++;
        change();
       
      }, 2000);
    });
    main.mouseout();

    //鼠标划上去停止
    main.on('mouseover', function () {
      clearInterval(timer);
    });
  
    //下一张图片
    next.on('click', function () {
      index++;
      change();
    });
    //上一张图片
    prev.on('click', function () {
      index--;
      change();
    });
    //圆点切换

    dots.on('click', function () {
      index = $(this).index();
      change();
    });





    //change换图片函数
    change = function () {


      if (index >= pic.length) index = 0;
      else if (index < 0) index = pic.length - 1;

      console.log(index);
      //清除图片
      pic.css('display', 'none');
      //清除圆点
      dots.removeClass('active');
      pic.eq(index).css('display', 'block');
      dots.eq(index).addClass('active');
    }
  }
  slide();
});