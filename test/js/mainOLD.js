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

// start of: determine is it mobile screen
var mobileViewWidth = 768,
    isMobileViewFlag = true;

function resizeWindowHandler(event) {
    if (window.innerWidth < mobileViewWidth) {
        isMobileViewFlag = true;
    } else {
        isMobileViewFlag = false;
    }
}

resizeWindowHandler(); // initial call
window.addEventListener('resize', resizeWindowHandler);
// end of: determine is it mobile screen

$(function () {
    var html = document.documentElement,
        body = document.body;

    var searchBtnStatus = 0,
        searchContainerInput = $(".search-container .input-container input")[0],
        searchBtn = $(".search-container .search-btn")[0];

    var mainMenu = $("header .main-menu"),
        mainMenuItems = $("header .main-menu .menu-item"),
        header = $("header");

    var tempScrollTop = 0,
        currentScrollTop = 0,
        referTopPoint = 80,
        distanceTop;

    // distanceTop = html.scrollTop || body && body.scrollTop || 0;
    // distanceTop -= html.clientTop; // в IE7- <html> смещён относительно (0,0)

    var pagesList = ["index", "company", "portfolio", "contacts"];


    // ***************************************************
    determineActivePage();
    scrollMenuHandler();
    // showMenu();
    resizeWindowHandler(); // initial call!!!
    // ***************************************************


    // **************************       FUNCTIONS       ***************************************************
    
    function determineActivePage() {
        var currentLocation = window.location.href,
            status = false;

        for (var i = 0; i < pagesList.length; i++) {
            if (currentLocation.indexOf(pagesList[i]) != -1) {
                $("header .main-menu .menu-item.active").removeClass("active");
                $(mainMenuItems[i]).addClass("active");
                status = true;
                break;
            }
        }

        // if page is out of list - suppose - index
        if (!status) {
            $(mainMenuItems[0]).addClass("active");
        }

    }

    // *******************************         END OF FUNCTIONS       ************************************


    // *****************    EVENT HANDLERS    *******************

    function resizeWindowHandler(event) {
        if (window.innerWidth < 1101) {
            $(mainMenu).css("display", "none");
        } else {
            $(mainMenu).css("display", "inline-block");
        }
    }

    function scrollMenuHandler() {
        distanceTop = html.scrollTop || body && body.scrollTop || 0;
        distanceTop -= html.clientTop; // в IE7- <html> смещён относительно (0,0)

        currentScrollTop = window.pageYOffset;

        if (distanceTop > referTopPoint) {
            if( !($(header).hasClass("header-small")) ) {
                ($(header).addClass("header-small"))
            }
        }
        else {
            if( ($(header).hasClass("header-small")) ) {
                ($(header).removeClass("header-small"))
            }
        }

        tempScrollTop = currentScrollTop;
    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('resize', resizeWindowHandler);
    window.addEventListener('scroll', scrollMenuHandler);

    // **************************************************

    // add target="_blank" for all anchors
    // $("a:not(.menu-item)").attr("target", "_blank");

    // start of mobile-menu show/hide
    $("header .menu-btn").on("click", function () {
        $(this).toggleClass("menu-btn-active");
        // $("header .main-menu").toggleClass("show-menu");
        $("header .main-menu").slideToggle();
        $("header").toggleClass("header-black active");

        $("html, body").toggleClass("scroll-lock");
        // $(".mask").toggleClass("darknes_active");
        //
    });
    // end of mobile-menu show/hide

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
                location.href = "/search-result.html";
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

    // *************************************************************

    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    GENERAL ANIMATIONS FOR ALL PORTFOLIO-MATERIAL/SERVICE-MATERIAL PAGES    *************

        $('.material-wrapper .text-block-cont .info-left .block-title, ' +
            '.material-wrapper .two-img-cont .img-cont:first-child img').addClass("transparent").viewportChecker({
            classToAdd: 'animated fadeInLeft',
            classToRemove: 'transparent',
            offset: 0,
            delay: 1000
        });

        $('.material-wrapper .text-block-cont .info-right, ' +
            '.material-wrapper .two-img-cont .img-cont:last-child img').addClass("transparent").viewportChecker({
            classToAdd: 'animated fadeInRight',
            classToRemove: 'transparent',
            offset: 100,
            delay: 1000
        });
        $('.material-wrapper .img-cont, .material-wrapper .video-cont').addClass("transparent").viewportChecker({
            classToAdd: 'animated fadeIn',
            classToRemove: 'transparent',
            offset: 100,
            delay: 1000
        });
    }

});

// test
// function f1(a, b) {
//     console.log(a, b);
// }
//
// var f2 = f1.bind(null, 'foo');
//
// f2("bar", "baz");