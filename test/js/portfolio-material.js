"use strict";

$(function () {
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.material-header-cont .material-logo-cont').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.material-header-cont .material-header').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.portfolio-material-cont p').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

        $('.portfolio-material-cont h2, .portfolio-material-cont h3').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });


    }

});