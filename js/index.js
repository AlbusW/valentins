/**
 * Created by Alice on 2016/5/9.
 */

require(["jquery", "swiper", "datepicker", "waypoints"], function ($, Swiper, datepicker, waypoint) {

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

    //方法们排队执行
    $(function () {
        $(window).scrollTop(0);
        fullHeight();
        menuH();
        autoSlider(".headSlider", 10000);
        animate(".about");
        animate(".mode");
        animate(".food");
        animate(".list");
        animate(".menu");
        animate(".show");
        animate(".order");
        animate(".footer");

        //gotop
        $(".toTop").on("click", function () {
            $("html,body").stop().animate({scrollTop: "0px"}, 1600, "swing");
            return false;
        });

        //nav锚点动画
        $(".m-nav").on("click", function (e) {
            if ($(e.target).text() == "主页") {
                $("html,body").stop().animate({scrollTop: "0px"}, 1000, "swing");
            } else if ($(e.target).text() == "品牌") {
                $("html,body").stop().animate({scrollTop: $(window).height() + 20 + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "心情") {
                $("html,body").stop().animate({scrollTop: $(".mode").offset().top - 70 + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "菜单") {
                $("html,body").stop().animate({scrollTop: $(".food").offset().top - 70 + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "活动") {
                $("html,body").stop().animate({scrollTop: $(".show").offset().top - 70 + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "预定") {
                $("html,body").stop().animate({scrollTop: $(".order").offset().top - 70 + "px"}, 1000, "swing");
            }

            $(e.target).addClass("navcur");
            return false;
        });

        $(".x-nav").on("click", function (e) {
            if ($(e.target).text() == "主页") {
                $("html,body").stop().animate({scrollTop: "0px"}, 1000, "swing");
            } else if ($(e.target).text() == "品牌") {
                $("html,body").stop().animate({scrollTop: $(".about").offset().top*1.5 + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "心情") {
                $("html,body").stop().animate({scrollTop: $(".mode").offset().top+ "px"}, 1000, "swing");
            } else if ($(e.target).text() == "菜单") {
                $("html,body").stop().animate({scrollTop: $(".food").offset().top + "px"}, 1000, "swing");
            } else if ($(e.target).text() == "活动") {
                $("html,body").stop().animate({scrollTop: $(".show").offset().top+ "px"}, 1000, "swing");
            } else if ($(e.target).text() == "预定") {
                $("html,body").stop().animate({scrollTop: $(".order").offset().top+ "px"}, 1000, "swing");
            }

            $(e.target).addClass("navcur");
            $(".x-navCtrl").removeClass("active");
            $("body").removeClass("nav-toggle");
            $("html,body").css({overflow: ""});
            return false;
        });

        //移动端导航
        $(".x-navCtrl").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $("body").removeClass("nav-toggle");
                $("html,body").css({overflow: ""});
            } else {
                $(this).addClass("active");
                $("body").addClass("nav-toggle");
                $("html,body").css({overflow: "hidden"});
            }

            return false;
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