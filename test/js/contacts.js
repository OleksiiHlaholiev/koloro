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
    })
});