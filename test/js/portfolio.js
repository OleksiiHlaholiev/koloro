"use strict";

$(function () {

    var portfolioBtnCnt = 0,
        itemsForPage = 9,

        portfolioMenuItems = $(".portfolio-menu ul li"),

        portfolioItemsCont = $('.our-works .portfolio-items-cont'),
        portfolioItemsAll = $(".our-works .portfolio-items-cont .portfolio-item"),

        currentPortfolioItems = portfolioItemsAll,
        morePortfolioBtn = $(".our-works .more-portfolio-btn");


    // ****************************************************************************
    resizeWindowHandler(); // initial call!!!

    // turn on this script only on pages with portfolio block (our-works)
    if ($("#our-works").length != 0) {
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
    }

    function portfolioItemsInit(portfolioElems) {
        $(portfolioItemsAll).addClass("hidden-item");
        $(portfolioElems).removeClass("hidden-item");

        for (var i = itemsForPage; i < portfolioElems.length; i++ ) {
            $(portfolioElems[i]).addClass("hidden-item");
        }

        var horizOrder = true;
        if (window.innerWidth <= 1400) {
            horizOrder = false;
        } else {
            horizOrder = true;
        }

        // start of initialise masonry-plugin
        $(portfolioItemsCont).masonry({
            // options...
            itemSelector: '.portfolio-item',
            // use element for option
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: horizOrder // Lays out items to (mostly) maintain horizontal left-to-right order
        });
        // end of initialise masonry-plugin
    }

    portfolioItemsInit(currentPortfolioItems);

    // *****************    EVENT HANDLERS    *******************

    function resizeWindowHandler(event) {
        if (window.innerWidth <= 1400) {
            itemsForPage = 6;
        } else {
            itemsForPage = 9;
        }
    }

    // ***************** REGISTER EVENT HANDLERS *******************
    window.addEventListener('resize', resizeWindowHandler);

    $(morePortfolioBtn).click(function (event) {
        event.preventDefault();

        var stop = Math.ceil(currentPortfolioItems.length / itemsForPage);
        // console.log("stop = " + stop + "; BtnCnt = " + portfolioBtnCnt);

        if (portfolioBtnCnt < stop - 1) {
            portfolioBtnCnt++;
            for (var i = (itemsForPage) * (portfolioBtnCnt); i < itemsForPage * (portfolioBtnCnt + 1); i++ ) {
                $(currentPortfolioItems[i]).removeClass("hidden-item");
            }

            $(portfolioItemsCont).masonry(); // trigger layout after hidden items added
        }
    });

    $(portfolioMenuItems).click(function () {
        if(!$(this).hasClass("active")) {
            $(portfolioMenuItems).removeClass("active");
            $(this).addClass("active");

            var switchCategory = $(this).attr("data-toggle");

            if (switchCategory === "category-0") {
                currentPortfolioItems = portfolioItemsAll;
            } else {
                currentPortfolioItems = $(portfolioItemsCont).find("." + switchCategory);
            }

            portfolioItemsInit(currentPortfolioItems);
            portfolioBtnCnt = 0;

            $('html, body').animate({
                scrollTop: $("#our-works").offset().top - $("header").height()}, 1000);
            return false;
        }
    });


    // *******************************************************************************************
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        // $(morePortfolioBtn).addClass("invisible").viewportChecker({
        //     classToAdd: 'animated fadeInUp',
        //     classToRemove: 'visible',
        //     offset: '10%',
        //     repeat: false
        // });
    }
});