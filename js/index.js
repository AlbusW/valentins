require(["jquery", "swiper", "datepicker", "waypoints"], function ($, Swiper, datepicker, waypoint) {
    var interval = 1000;
    var animateType = 'swing';
    var navMap = {
        '主页' : 'main',
        '品牌' : 'brand',
        '心情' : 'mode',
        '菜单' : 'food',
        '活动' : 'show',
        '预定' : 'order'
    };

    //动态调整首屏高度
    function fullHeight() {
        $(".fullHeight").height($(window).height());
        $(".fullHeight .toanimate").addClass(" animate fadeInUp");
        $(".fullHeight .toanimate2").addClass(" animate fadeIn");
    }

    //菜单区列高度自适应
    function menuH() {
        if ($(window).width() >= 900) {
            $(".recommend .recommend-cell-h").height($(".recommend .recommend-clo .recommend-row").height() * 2 - 40);
        } else {
            $(".recommend .recommend-cell-h").height("");
        }
    }

    //单纯的自动淡入淡出自动轮播
    function autoSlider(warpClass, interval) {
        var step = 0;
        var $slider = $(warpClass).find(".slider");
        var totalStep = $slider.length;

        function move() {
            if (totalStep) {
                step++;
                if (step >= totalStep) {
                    step = 0;
                }
                $slider.eq(step).fadeIn(800).siblings().fadeOut(800);
            }
        }

        setInterval(move, interval);
    }


    //navscroll
    function navFixed(navName) {
        $(navName).css({
            "position": "fixed",
            "top": 0,
            "left": 0
        });
    }

    function navRel(navName) {
        $(navName).css({
            "position": "relative",
            "top": "",
            "left": ""
        })
    }

    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 6000,
        loop: true,
        autoplayDisableOnInteraction: false,
        direction: 'horizontal',
        speed: 1000,

        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationType: 'bullets',
        paginationClickable: true
    });

    function animate(ele) {
        var $about = $(ele);
        if ($about.length > 0) {
            $about.waypoint(function (direction) {
                if (direction === "down" && !$(this.element).hasClass("animate")) {
                    setTimeout(function () {
                        $(ele).find(".toanimate").addClass("fadeInUp animate");
                        $(ele).find(".toanimate2").addClass("fadeIn animate");
                        $(ele).find(".toanimate3").addClass("bounceIn animate");
                    }, 200);
                    $(this.element).addClass('animated');
                }
            }, {offset: '80%'});
        }
    }

    function renderActive() {
        var scrollTop = $(window).scrollTop();
        var i = 0;
        if ($(window).height() + 20 <= scrollTop && scrollTop <= $(".mode").offset().top - 100) {
            i = 1;
        }
        if ($(".mode").offset().top - 100 <= scrollTop && scrollTop <= $(".food").offset().top - 100) {
            i = 2;
        }
        if ($(".food").offset().top - 100 <= scrollTop && scrollTop <= $(".show").offset().top - 100) {
            i = 3;
        }
        if ($(".show").offset().top - 100 <= scrollTop && scrollTop <= $(".order").offset().top - 100) {
            i = 4;
        }
        if ($(".order").offset().top - 100 <= scrollTop && scrollTop <= $("body").height() - $(window).height()) {
            i = 5;
        }
        $(".m-nav .navlist , .x-nav a").removeClass("navcur");
        $(".m-nav .navlist").eq(i).addClass("navcur");
        $(".x-nav a").eq(i).addClass("navcur");
    }

    //函数节流
    function throttle (func, wait) {
        var timeout, context, args, result;
        var previous = 0;
        var throttled = function() {
            var now = new Date().getTime();
            if (!previous) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (!timeout){
                timeout = setTimeout(function () {
                    previous = now;
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }, remaining);
            }
            return result;
        }
        return throttled;
    }

    //函数调用
    $(function () {
        $(window).scrollTop(0);
        fullHeight();
        menuH();
        autoSlider(".headSlider", 10000);
        var animateList = ['about','mode','food','list','menu','show','order','footer'];
        animateList.forEach(function (item,index) {
            animate('.'+item);
        });

        //gotop
        $(".toTop").on("click", function () {
            $("html,body").stop().animate({scrollTop: "0px"}, 1600, "swing");
        });

        //nav锚点动画
        $(".m-nav").on("click", function (e) {
            var text = $(e.target).text();
            if (navMap[text]) {
                $("html,body").stop().animate({scrollTop: navMap[text] == 'main' ? '0px' : (navMap[text] == 'brand' ? $(window).height()+20 : $('.'+navMap[text]).offset().top - 70 + "px")}, interval, animateType);
                $(e.target).addClass("navcur");
            }
        });

        $(".x-nav").on("click", function (e) {
            var text = $(e.target).text();
            if (navMap[text]) {
                $("html,body").stop().animate({scrollTop: navMap[text] == 'main' ? '0px' : (navMap[text] == 'brand'  ? $(".about").offset().top*1.5 + "px" : $('.'+navMap[text]).offset().top + "px")}, interval, animateType);
                $(e.target).addClass("navcur");
                $(".x-navCtrl").removeClass("active");
            }
            $("body").removeClass("nav-toggle");
            $("html,body").css({overflow: ""});
        });

        //移动端导航
        $(".x-navCtrl").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $("body").removeClass("nav-toggle");
            } else {
                $(this).addClass("active");
                $("body").addClass("nav-toggle");
            }
            $("html,body").css({overflow: $(this).hasClass("active") ? '' : 'hidden'});
        });

        //处理一系列scroll事件
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();

            //mid-nav导航fix和relative切换
            if (scrollTop > $(window).height() + 10) {
                navFixed(".m-nav");
            } else {
                navRel(".m-nav");
            }

            throttle(renderActive,100)();
        });

        $("#date").datepicker({
            format: 'yyyy/mm/dd'
        });

        $(window).resize(function () {
            $(".fullHeight").height($(window).height());

            if ($(window).width() >= 900) {
                $(".recommend .recommend-cell-h").height($(".recommend .recommend-clo .recommend-row").height() * 2 - 40);
            } else {
                $(".recommend .recommend-cell-h").height("");
            }
        });

    });
});