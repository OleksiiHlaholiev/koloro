"use strict";

// //= libs/jquery.custom-file-input.js
// (function (e, t, n) {
//     var r = e.querySelectorAll("html")[0];
//     r.className = r.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2")
// })(document, window, 0);

$(function () {
    var formHeaders = $(".form-headers-cont .form-header"),
        contactForms = $(".contacts-forms .contact-form"),
        formSwitchItems = $(".form-switch li");

    // initial states
    $(formHeaders).addClass("animated fadeInDown");
    $(contactForms).addClass("animated fadeInUp");

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