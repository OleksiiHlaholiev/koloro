"use strict";

$(function () {
    var formHeaders = $(".form-headers-cont .form-header"),
        contactForms = $(".contacts-forms .contact-form"),
        formSwitchItems = $(".form-switch li");

    // initial states
    // $(formHeaders).addClass("animated fadeInDown");
    // $(contactForms).addClass("animated fadeInUp");

    $(formSwitchItems).on("click", function () {
        if (!$(this).hasClass("active")) {
            $(formSwitchItems).toggleClass("active");
            $(formHeaders).toggleClass("active");
            $(formHeaders).addClass("animated fadeInDown");
            $(contactForms).toggleClass("active");
            $(contactForms).addClass("animated fadeInUp");
        }
    });

    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.main-top-container .cta-big, .main-top-container .cta-small').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            invertBottomOffset: true,
            repeat: false
        });

        $('.main-top-container .left-cont .img-cont, .main-top-container .left-cont .fomdih-contact').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInLeft',
            classToRemove: 'visible',
            offset: '10%',
            invertBottomOffset: true,
            repeat: false
        });

        $('.main-top-container .right-cont .img-cont, .main-top-container .right-cont .fomdih-contact').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInRight',
            classToRemove: 'visible',
            offset: '10%',
            invertBottomOffset: true,
            repeat: false
        });

        $('.contacts-forms .form-headers-cont .form-header').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            invertBottomOffset: true,
            repeat: false
        });

        $('.contacts-forms .contact-form').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            invertBottomOffset: true,
            repeat: false
        });



    }
});