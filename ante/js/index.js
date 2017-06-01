/**
 * Created by Glalex on 01.06.2017.
 */

"use strict";

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
    })
});
