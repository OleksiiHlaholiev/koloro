/**
 * Created by Glalex on 01.06.2017.
 */

"use strict";

var html = document.documentElement,
    body = document.body;

var tempScrollTop, currentScrollTop = 0, referTopPoint = 300, distanceTop;


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

function hideMenu (){
    if (distanceTop > referTopPoint){
        if ($("header").hasClass("menu-hidden")){
            $("header").removeClass("menu-visible");
        }
        else {
            $("header").addClass("menu-hidden");
        }
    }
}
function showMenu(){
    if (distanceTop > referTopPoint){
        if( !($("header").hasClass("menu-visible")) ){
            $("header").addClass("menu-visible");
            // $("header").addClass("change_color");
        }
    }
}

$(function () {

    // ******************** GLOBAL VARIABLES ****************************
    var scrollPreviousPosition = 0,
        SCROLL_STEP = 100,
        isMobileViewFlag = true,
        mobileViewWidth = 768,
        achievmentsSectionFirstScroll = true,
        achievmentCounterBusyFlag = false,

        scrollFuncTimer,
        busyFlag = false;

    var topSection = document.querySelector("#top-section"),
        header = document.querySelector("header"),
        logoBtn = header.querySelector(".logo-cont a"),
        siteNav = document.querySelector(".menu-cont .site-nav"),
        siteNavItems = siteNav.querySelectorAll(".nav-list li a"),
        tarifSection = document.querySelector("#tarif-section"),
        servicesSection = document.querySelector("#services-section"),
        contactsSection = document.querySelector("#contacts-section"),
        achievmentsSection = document.querySelector("#achievments-section"),
        achievmentCounters = achievmentsSection.querySelectorAll(".achievment-counter");


    // ***************************************************
    resizeWindowHandler();
    scrollWindowHandler(); // initial call!!!
    // ***************************************************

    $(".menu-mob-btn").on("click", function () {
        $(".menu-cont .site-nav").slideToggle(500);
    });

    $(".registration-slider").owlCarousel({
        loop:true,
        margin:0,
        items:1,
        nav:false,
        autoplay:false,

        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:4000, //Время смены слайда
        autoplayHoverPause:false

    });

    var timeSlider = $(".time-slider");

    $(timeSlider).owlCarousel({
        loop:true,
        margin:0,
        items:1,
        nav:false,
        autoplay:false,

        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:5000, //Время смены слайда
        autoplayHoverPause:false

    });

    // Go to the next item
    $('.time-slider-cont .arrow-left-btn').click(function() {
        $(timeSlider).trigger('next.owl.carousel');
    });
    // Go to the previous item
    $('.time-slider-cont .arrow-right-btn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        $(timeSlider).trigger('prev.owl.carousel', [300]);
    });

    // var reviewsSlider = $(".reviews-slider");

    // $(reviewsSlider).owlCarousel({
    //     loop:true,
    //     margin:0,
    //     items:1,
    //     nav:false,
    //     autoplay:false,
    //
    //     smartSpeed:1000, //Время движения слайда
    //     autoplayTimeout:5000, //Время смены слайда
    //     autoplayHoverPause:false
    //
    // });
    //
    // // Go to the next item
    // $('.reviews-slider-cont .arrow-left-btn').click(function() {
    //     $(reviewsSlider).trigger('next.owl.carousel');
    // });
    // // Go to the previous item
    // $('.reviews-slider-cont .arrow-right-btn').click(function() {
    //     $(reviewsSlider).trigger('prev.owl.carousel');
    // });

    var  partnersSlider = $(".partners-slider");

    $(partnersSlider).owlCarousel({
        loop:true,
        margin:5,
        items:3,
        nav:false,
        autoplay:true,

        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:5000, //Время смены слайда
        autoplayHoverPause:false,

        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1200:{
                items:3
            }
        }

    });

    // Go to the next item
    $('.partners-slider-cont .arrow-left-btn').click(function() {
        $(partnersSlider).trigger('next.owl.carousel');
    });
    // Go to the previous item
    $('.partners-slider-cont .arrow-right-btn').click(function() {
        $(partnersSlider).trigger('prev.owl.carousel');
    });


    // ****************************************************************
    // Disable scroll zooming and bind back the click event
    function onMapMouseleaveHandler() {
        this.addEventListener('click', onMapClickHandler);
        this.removeEventListener('mouseleave', onMapMouseleaveHandler);
        this.querySelector('iframe').style.pointerEvents = "none";
    }

    function onMapClickHandler() {

        // Disable the click handler until the user leaves the map area
        this.removeEventListener('click', onMapClickHandler);

        // Enable scrolling zoom
        this.querySelector('.map').style.pointerEvents = "auto";

        // Handle the mouse leave event
        this.addEventListener('mouseleave', onMapMouseleaveHandler);
    }

    // ****************************************************************
    var mapCont = document.querySelector("#contacts-section .map-cont");
    // Enable map zooming with mouse scroll when the user clicks the map
    mapCont.addEventListener('click', onMapClickHandler);
    // ****************************************************************

    $(".more-services-btn").on("click", function (event) {
        $(this).toggleClass("icon-rotate");
        $(".services-items-cont.mobile-hidden").slideToggle(400);
    });


    // .order-form-btn
    $(".callback-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        $(".order-form").fadeIn(400);
    });

    $(".order-form .close-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        $(".order-form").fadeOut(400);
    });


    // **************************************************************

    function scrollFunc(startPos, stopPos, step) {
        var epsilon = 0.1,
            step_ms = 10,
            deltaScroll = (stopPos - startPos) / step;

        if (Math.abs(deltaScroll) > epsilon) {
            scrollFuncTimer = setInterval(
                function () {
                    // document.body.scrollTop
                    if (deltaScroll == 0 ||
                        (deltaScroll > 0 && pageYOffset >= stopPos) ||
                        (deltaScroll < 0 && pageYOffset <= stopPos)) {
                        clearInterval(scrollFuncTimer);
                        busyFlag = false;
                    } else {
                        scrollBy(0, deltaScroll);
                    }
                },
                step_ms
            );
        }
        else {
            busyFlag = false;
        }
    }

    function activeSectionHandler(event){
        event.preventDefault();
        if (!busyFlag) {
            var prevActiveItem = document.querySelector(".site-nav .active"),
                stopPos = topSection.offsetTop;

            busyFlag = true;
            prevActiveItem.classList.remove("active");
            this.classList.add("active");
            this.style.textDecoration = "none";

            if (window.innerWidth < mobileViewWidth) {
                $(siteNav).slideUp("fast");
            }

            switch (this.getAttribute("href")) {
                case "#tarif-section":
                    stopPos = tarifSection.offsetTop;
                    break;
                case "#services-section":
                    stopPos = servicesSection.offsetTop;
                    break;
                case "#contacts-section":
                    stopPos = contactsSection.offsetTop;
                    break;
                default:
                    stopPos = topSection.offsetTop;
                    break;
            }
            // The pageYOffset property is an alias for the scrollY property:
            // window.pageYOffset == window.scrollY; // always true
            // For cross-browser compatibility, use window.pageYOffset instead of window.scrollY.
            // Additionally, older versions of Internet Explorer (< 9) do not support either property
            if (stopPos == topSection.offsetTop) {
                scrollFunc(
                    pageYOffset,
                    stopPos,
                    SCROLL_STEP
                );
            } else {
                scrollFunc(
                    pageYOffset,
                    stopPos - header.clientHeight,
                    SCROLL_STEP
                );
            }
        }
    }

    function logoButtonHandler(event) {
        event.preventDefault();
        if (!busyFlag) {
            busyFlag = true;
            scrollFunc(
                pageYOffset,
                topSection.offsetTop,
                SCROLL_STEP
            )
        }
    }

    function achievmentItemCounterHandler() {

        if (achievmentCounterBusyFlag == false) {
            achievmentCounterBusyFlag = true;

            var step = 30,
                timeStep = 100,
                countFuncTimer = [];

            for (var i = 0; i < achievmentCounters.length; i++) {
                (function (i) {
                    var deltaCount = +achievmentCounters[i].dataset.achievmentCounter / step;
                    var localCount = 0;
                    achievmentCounters[i].innerText = "0";
                    countFuncTimer[i] = setInterval(
                        function () {
                            if (localCount + deltaCount >= +achievmentCounters[i].dataset.achievmentCounter) {
                                localCount = +achievmentCounters[i].dataset.achievmentCounter;
                                clearInterval(countFuncTimer[i]);
                                achievmentCounterBusyFlag = false;
                            } else {
                                localCount += deltaCount;
                            }
                            localCount = Math.round(localCount);
                            // teamGalleryItemCounters[i].innerText = String(localCount);
                            achievmentCounters[i].innerText = localCount.toLocaleString();
                        },
                        timeStep
                    );
                })(i)
            }
        }
    }

    function resizeWindowHandler(event) {
        if (window.innerWidth < mobileViewWidth) {
            isMobileViewFlag = true;
        } else {
            isMobileViewFlag = false;

            if (achievmentsSectionFirstScroll) {
                $(achievmentCounters).text("0");
            }

            $(siteNav).fadeIn(10);
        }
    }

    function scrollWindowHandler(event) {
        var prevActiveItem = document.querySelector(".site-nav .active"),
            tempOffset;


        if (window.innerWidth < mobileViewWidth) {
            tempOffset = window.innerHeight / 3;
        } else {
            tempOffset = window.innerHeight / 1.4;
        }

        var	currentPosition = document.body.scrollTop ?
            (document.body.scrollTop + tempOffset) :
            (document.documentElement.scrollTop + tempOffset);

        if ( (currentPosition > tarifSection.offsetTop) &&
            (currentPosition < tarifSection.offsetTop + tarifSection.offsetHeight) ) {
            prevActiveItem.classList.remove("active");
            siteNavItems[0].classList.add("active");
        } else if ( (currentPosition > servicesSection.offsetTop) &&
            (currentPosition < servicesSection.offsetTop + servicesSection.offsetHeight) ) {
            prevActiveItem.classList.remove("active");
            siteNavItems[1].classList.add("active");
        } else if ( (currentPosition > contactsSection.offsetTop) &&
            (currentPosition < ontactsSection.offsetTop + contactsSection.offsetHeight) ) {
            prevActiveItem.classList.remove("active");
            siteNavItems[2].classList.add("active");
        }

        if (!isMobileViewFlag) {
            if ( (currentPosition > achievmentsSection.offsetTop) &&
                (currentPosition < (achievmentsSection.offsetTop + achievmentsSection.clientHeight)) ) {

                if (achievmentsSectionFirstScroll) {
                    achievmentsSectionFirstScroll = false;

                    achievmentItemCounterHandler();
                }
            }
        }

        scrollPreviousPosition = currentPosition;

    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('scroll', scrollWindowHandler);
    window.addEventListener('resize', resizeWindowHandler);

    $(siteNavItems).on("click", activeSectionHandler);
    $(logoBtn).on("click", logoButtonHandler);

    // ************************************************************************************

});
