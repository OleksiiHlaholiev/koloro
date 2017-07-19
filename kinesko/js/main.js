/**
 * Created by glalex on 12.07.2017.
 */

"use strict";


//кнопка скролла вверх
function backToTop() {
    $(window).scroll(function () {
        var bo = $(document).scrollTop();
        var time_to_show = 600;	//$("#indeficator_toshow").offset().top;

        if (bo >= time_to_show) {
            $(".back-to-top").addClass("back-to-top-visible");
        }
        else {
            $(".back-to-top").removeClass("back-to-top-visible");
        }
    });
    $(".back-to-top").click(function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 1100);
    });
}

backToTop();

// toggleText
jQuery.fn.extend({
    toggleText: function (a, b) {
        var that = this;
        if (that.text() != a && that.text() != b) {
            that.text(a);
        } else if (that.text() == a) {
            that.text(b);
        } else if (that.text() == b) {
            that.text(a);
        }
        return this;
    }
});

$(function () {

    var mainMenu = $("header .main-menu");

    // ***************************************************
    resizeWindowHandler();
    scrollWindowHandler(); // initial call!!!
    // ***************************************************

    function resizeWindowHandler(event) {
        // if (window.innerWidth < mobileViewWidth) {
        //     isMobileViewFlag = true;
        //
        //     $(siteNav).css("display", "none");
        // } else {
        //     isMobileViewFlag = false;
        //
        //     if (achievmentsSectionFirstScroll) {
        //         $(achievmentCounters).text("0");
        //     }
        //
        //     $(siteNav).css("display", "block");
        // }
        if (window.innerWidth < 1100) {
            $(mainMenu).css("display", "none");
        } else {
            $(mainMenu).css("display", "inline-block");
        }
    }

    function scrollWindowHandler(event) {
        // var prevActiveItem = document.querySelector(".site-nav .active"),
        //     tempOffset;
        //
        //
        // if (window.innerWidth < mobileViewWidth) {
        //     tempOffset = window.innerHeight / 3;
        // } else {
        //     tempOffset = window.innerHeight / 1.4;
        // }
        //
        // var	currentPosition = document.body.scrollTop ?
        //     (document.body.scrollTop + tempOffset) :
        //     (document.documentElement.scrollTop + tempOffset);
        //
        //
        // scrollPreviousPosition = currentPosition;

    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('scroll', scrollWindowHandler);
    window.addEventListener('resize', resizeWindowHandler);
    // *************************************************************

    // **************************************************
    var header = $("header");

    var html = document.documentElement,
        body = document.body;

    var tempScrollTop, currentScrollTop = 0, referTopPoint = 300, distanceTop;

    function hideMenu (){
        if (distanceTop > referTopPoint){
            if ($(header).hasClass("header-hidden")){
                $(header).removeClass("header-visible");
            }
            else {
                $(header).addClass("header-hidden");
            }
        }
    }

    function showMenu(){
        if (distanceTop > referTopPoint){
            if( !($(header).hasClass("header-visible")) ){
                $(header).addClass("header-visible");
                $("header").addClass("header-darkness");
            }
        }
        else {
            $("header").removeClass("header-darkness");
            setTimeout(function(){
                $("header").removeClass("header-hidden header-visible");
            }, 10);
        }
    }

    $(window).scroll(function(){
        currentScrollTop = window.pageYOffset;
        distanceTop = html.scrollTop || body && body.scrollTop || 0;
        distanceTop -= html.clientTop; // в IE7- <html> смещён относительно (0,0)

        if (tempScrollTop < currentScrollTop ){//scroll down
            hideMenu();
        }
        else if (tempScrollTop > currentScrollTop ){//scroll top
            showMenu();
            // default_style();
        }
        // console.log("currentScrollTop", currentScrollTop);

        tempScrollTop = currentScrollTop;

    });

    // **************************************************

    // start of mobile-menu show/hide
    $("header .menu-btn").on("click", function () {
        $(this).toggleClass("menu-btn-active");
        // $("header .main-menu").toggleClass("show-menu");
        $("header .main-menu").slideToggle();
        // $(".mask").toggleClass("darknes_active");
        //
        // $("header").toggleClass("black-header");
    });
    // end of mobile-menu show/hide

    var searchBtnStatus = 0,
        searchContainerInput = $(".search-container .input-container input")[0],
        searchBtn = $(".search-container .search-btn")[0];

    $(searchBtn).on("click", function (event) {
        if (!searchBtnStatus) {
            event.preventDefault();
            // searchContainerInput.setAttribute("autofocus", "autofocus");
            $(searchContainerInput).addClass("active").fadeIn(400);
            searchBtnStatus = 1;
        }
        else {
            if(searchContainerInput.value.length) {
                event.preventDefault();
                location.href = "/search_result.html";
                // console.log(location.href);
            }
            // searchBtnStatus = 0;
        }
        event.stopPropagation();

        // $(searchContainerInput).toggleClass("active").fadeToggle();
    });

    function searchFormClose (e) {
        if ( e.keyCode === 27 ) {
            // close search-field on ESC
            if($(searchContainerInput).hasClass("active")) {
                $(searchContainerInput).removeClass("active").fadeOut(400);
                searchBtnStatus = 0;
            }
        }
    }

    document.addEventListener('keydown', searchFormClose);

    $("body").click(function(event) {
        if(!$(event.target).closest(searchContainerInput).length &&
            $(searchContainerInput).hasClass("active")) {
            if (searchBtnStatus) {
                event.preventDefault();
                $(searchContainerInput).removeClass("active").fadeOut(400);
                // searchContainerInput.removeAttribute("autofocus");
                searchBtnStatus = 0;
            }
        }
    });

    // read-more event handler
    $(".read-more-btn").on("click", function () {
        $(this.parentNode.querySelector(".for-read-more")).slideToggle();
        $(this).toggleText("читать дальше...", "скрыть");
    });

});