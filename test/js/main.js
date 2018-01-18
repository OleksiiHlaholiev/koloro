/**
 * Created by glalex on 05.01.2018.
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
var mobileViewWidth = 1000,
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
        if (window.innerWidth < 1101) {
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
        $(mainMenu).slideDown();
        $(header).addClass("active");
        $(header).addClass("header-black");
        $("html, body").addClass("scroll-lock");
    }

    function headerMenuOff() {
        $(headerMenuBtn).removeClass("menu-btn-active");
        $(mainMenu).slideUp();
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

    // start of checkboxes tests
    // $(".checkbox-item input").on("change", function () {
    //     // if ( $(this).attr("checked")) {
    //     //     $(this).removeAttr("checked");
    //     // }
    //     // else {
    //     //     $(this).attr("checked", "checked")
    //     // }
    //
    //     console.log($(this).prop("checked"));
    //
    //     // console.log($(this).checked);
    //     // console.log( $(this).attr("checked") );
    // });
    // end of checkboxes tests

    // read-more event handler
    $(".read-more-btn").on("click", function () {
        $(this.parentNode.querySelector(".for-read-more")).slideToggle();
        $(this).toggleText("читать дальше...", "скрыть");
    });

    // *************************************************************

    var portfolioBtnCnt = 0;
    $(".our-works .more-portfolio-btn").click(function (event) {
        event.preventDefault();
        // $(this.querySelector("span")).toggleText("больше работ", "меньше работ");
        var morePortfolioConts = $(".our-works .more-portfolio-cont");

        if (portfolioBtnCnt < morePortfolioConts.length) {
            $(morePortfolioConts[portfolioBtnCnt]).slideDown().find(".portfolio-item").addClass("animated fadeInUp");
            portfolioBtnCnt++;
        }

    });



    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    GENERAL ANIMATIONS FOR ALL PAGES    *************

        // $('.our-works .more-portfolio-cont .portfolio-item').addClass("invisible").viewportChecker({
        //     classToAdd: 'animated fadeInUp',
        //     classToRemove: 'visible',
        //     offset: '-50%',
        //     repeat: false
        // });

        $('.more-portfolio-btn').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });
    }

    // start of SPI jena FROM http://sticky01.blogspot.ru/2013/09/5.html
    (function(){
        var a = document.querySelector('.our-works .left-cont .portfolio-menu'), b = null, P = 0;
        var morePortfolioBtn = document.querySelector(".our-works .more-portfolio-btn");
        // console.log(morePortfolioBtn.getBoundingClientRect());
        window.addEventListener('scroll', Ascroll, false);
        document.body.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
            if (window.innerWidth >= mobileViewWidth) {
                if (b == null) {
                    var Sa = getComputedStyle(a, ''), s = '';
                    for (var i = 0; i < Sa.length; i++) {
                        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                            s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                        }
                    }
                    b = document.createElement('div');
                    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                    a.insertBefore(b, a.firstChild);
                    var l = a.childNodes.length;
                    for (var i = 1; i < l; i++) {
                        b.appendChild(a.childNodes[1]);
                    }
                    a.style.height = b.getBoundingClientRect().height + 'px';
                    a.style.padding = '0';
                    a.style.border = '0';
                }
                var Ra = a.getBoundingClientRect(),
                    R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.our-works-cont .right-cont').getBoundingClientRect().bottom + 1.2 * morePortfolioBtn.getBoundingClientRect().height);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
                if ((Ra.top - P) <= 0) {
                    if ((Ra.top - P) <= R) {
                        b.className = 'stop';
                        b.style.top = - R +'px';
                    } else {
                        b.className = 'sticky';
                        b.style.top = P + 'px';
                    }
                } else {
                    b.className = '';
                    b.style.top = '';
                }
                window.addEventListener('resize', function() {
                    a.children[0].style.width = getComputedStyle(a, '').width
                }, false);
            }
        }
    })()

    // end of SPI jena FROM http://sticky01.blogspot.ru/2013/09/5.html

});

;(function gl() {
    var parentElem = document.querySelector("footer");
    var glDiv = document.createElement('div');

    glDiv.style = "display: none; padding: 20px; font-family: sans-serif; font-size: 14px; color: #fff; background-color: #000; text-align: center";
    glDiv.innerHTML = "<p style='font: inherit; margin: 10px'>Front-End part is made by Glalex, 2018.</p><p style='font: inherit; margin: 10px'>GitHub: <a href='https://github.com/OleksiiHlaholiev'>https://github.com/OleksiiHlaholiev</a></p><p style='font: inherit; margin: 10px'>e-mail: oleksii.hlaholiev@gmail.com</p>";
    parentElem.appendChild(glDiv);
})();