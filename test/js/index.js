"use strict";

$(function () {
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.img-cont .block-line').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInDown',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

    }

});