"use strict";

$(function () {
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.main-top-container .left-cont .main-header, ' +
            '.main-top-container .left-cont .img-cont, ' +
            '.main-top-container .illustrations-cont .img-cont').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInLeft',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });


        $('.main-top-container .right-cont .lamp-cont, ' +
            '.main-top-container .right-cont .lamp-text').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInRight',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.main-top-container .main-text').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });


        $('.section-header, .img-cont .services-underlining, .img-cont .block-line').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });


        $('.service-item .service-img-cont').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.service-item .service-info .service-header, .service-item .service-info .service-cta').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.service-item .service-list').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });


    }

});