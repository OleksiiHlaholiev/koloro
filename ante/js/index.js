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
        autoplay:false,

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

});
