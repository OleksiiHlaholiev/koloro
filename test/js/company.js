'use strict';

$(function () {

    var memberInfoConts = $(".our-team .member-info");

    // turn on team-member photo on hover
    memberInfoConts.on("mouseover", function () {
        if (window.innerWidth > 1000) {
            $(this.parentNode).find(".member-photo").addClass("active");
        }
    });

    // turn off team-member photo on mouseleave
    memberInfoConts.on("mouseleave", function () {
        if (window.innerWidth > 1000) {
            $(this.parentNode).find(".member-photo").removeClass("active");
        }
    });

});