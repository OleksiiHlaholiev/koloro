"use strict";

$(function () {
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        // $('.main-top-container .left-cont .main-header').addClass("invisible").viewportChecker({
        //     classToAdd: 'animated fadeInLeft',
        //     classToRemove: 'visible',
        //     offset: '10%',
        //     repeat: false
        // });
        //
        // $('.main-top-container .right-cont .lamp-text').addClass("invisible").viewportChecker({
        //     classToAdd: 'animated fadeInRight',
        //     classToRemove: 'visible',
        //     offset: '10%',
        //     repeat: false
        // });

        $('.img-cont .block-line').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

    }

});