'use strict';

$(function () {

    var memberInfoConts = $(".our-team .member-info"),
        memberPhotoConts = $(".our-team .member-photo");

    function turnPhotoOn(elem) {
        if (window.innerWidth > 1000) {
            $(elem.parentNode).find(".member-photo").addClass("active");
        }
    }

    function turnPhotoOff(elem) {
        if (window.innerWidth > 1000) {
            $(elem.parentNode).find(".member-photo").removeClass("active");
        }
    }

    // turn on team-member photo on hover
    memberInfoConts.on("mouseover", function () {
        turnPhotoOn(this);
    });
    memberPhotoConts.on("mouseover", function () {
        turnPhotoOn(this);
    });

    // turn off team-member photo on mouseleave
    memberInfoConts.on("mouseleave", function () {
        turnPhotoOff(this);
    });
    memberPhotoConts.on("mouseleave", function () {
        turnPhotoOff(this);
    });

    if (!isMobileViewFlag) {
        // ****************************************************************************
        // *************    ANIMATIONS FOR THIS PAGE    *************

        $('.info-block-cont .title-cont .section-header, .info-block-cont .title-cont .img-cont').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInLeft',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });
        $('.info-block-cont .text-cont p').addClass("invisible").viewportChecker({
            classToAdd: 'animated fadeInRight',
            classToRemove: 'visible',
            offset: '10%',
            repeat: false
        });

    }

});