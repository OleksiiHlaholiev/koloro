"use strict";

$(function () {
    // ANIMATION BLOCK
    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.portfolio-material-cont .order-form-btn').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInUp',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });
    }
});