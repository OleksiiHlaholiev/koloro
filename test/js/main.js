/**
 * Created by glalex on 05.01.2018.
 */

"use strict";


//кнопка скролла вверх
;(function backToTop() {
    $(window).scroll(function () {
        var curScrollPos = $(document).scrollTop();
        var refScrollPos = window.innerHeight;

        if (curScrollPos >= refScrollPos) {
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
})();

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
var mobileViewWidth = 1000,
    isMobileViewFlag = true;
// end of: determine is it mobile screen

$(function () {
    var html = document.documentElement,
        body = document.body;

    var mainMenu = $("header .main-menu"),
        mainMenuItems = $("header .main-menu .menu-item"),
        header = $("header"),
        headerMenuBtn = $("header .menu-btn"),
        headerMenuBtnState = 0;

    var tempScrollTop = 0,
        currentScrollTop = 0,
        referTopPoint = 40,
        distanceTop,
        firstPageLoadFlag = true;

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
        // start of: determine is it mobile screen
        if (window.innerWidth < mobileViewWidth) {
            isMobileViewFlag = true;
        } else {
            isMobileViewFlag = false;
        }
        // end of: determine is it mobile screen

        if (window.innerWidth <= 1100) {
            // $(mainMenu).css("display", "none");
            headerMenuOff();
        } else {
            $(mainMenu).css("display", "inline-block");
        }

        if (window.innerWidth < mobileViewWidth) {
            referTopPoint = 20;
        } else {
            referTopPoint = 40;
        }
    }

    function scrollMenuHandler(event) {
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

        // console.log("currentScrollTop", currentScrollTop);
        tempScrollTop = currentScrollTop;
    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('resize', resizeWindowHandler);
    window.addEventListener('scroll', scrollMenuHandler);

    // **************************************************

    // add target="_blank" for all anchors
    // $("a:not(.menu-item)").attr("target", "_blank");

    function headerMenuOn() {
        $(headerMenuBtn).addClass("menu-btn-active");
        // $(mainMenu).slideDown();
        $(mainMenu).fadeIn(0);
        $(header).addClass("active");
        $(header).addClass("header-black");
        $("html, body").addClass("scroll-lock");
    }

    function headerMenuOff() {
        $(headerMenuBtn).removeClass("menu-btn-active");
        // $(mainMenu).slideUp();
        $(mainMenu).fadeOut(0);
        $(header).removeClass("active");
        $(header).removeClass("header-black");
        $("html, body").removeClass("scroll-lock");
    }

    // start of mobile-menu show/hide
    $(headerMenuBtn).on("click", function () {

        if (headerMenuBtnState) {
            headerMenuBtnState = 0;
            headerMenuOff();
        } else {
            headerMenuBtnState = 1;
            headerMenuOn();
        }
    });
    // end of mobile-menu show/hide

    // read-more event handler
    $(".read-more-btn").on("click", function () {
        $(this.parentNode.querySelector(".for-read-more")).slideToggle();
        $(this).toggleText("читать дальше...", "скрыть");
    });

    // *************************************************************

    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    GENERAL ANIMATIONS FOR ALL PAGES    *************

        $(".more-portfolio-btn").addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });
    }

});

;(function gl() {
    var parentElem = document.querySelector("footer");
    var glDiv = document.createElement('div');

    glDiv.style = "display: none; padding: 20px; font-family: sans-serif; font-size: 14px; color: #fff; background-color: #000; text-align: center";
    glDiv.innerHTML = "<p style='font: inherit; margin: 10px'>Front-End part is made by Glalex, 2018.</p><p style='font: inherit; margin: 10px'>GitHub: <a href='https://github.com/OleksiiHlaholiev'>https://github.com/OleksiiHlaholiev</a></p><p style='font: inherit; margin: 10px'>e-mail: oleksii.hlaholiev@gmail.com</p>";
    parentElem.appendChild(glDiv);
})();