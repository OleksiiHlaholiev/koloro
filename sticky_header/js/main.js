"use strict";

window.addEventListener('load', function() {

    var stickyHeader = document.getElementById("sticky-header"),
        beforeHeaderSection = document.querySelector(".before-header-section"),
        refPoint = stickyHeader.offsetTop;

    function scrollWindowHandler() {
        if (window.pageYOffset >= beforeHeaderSection.clientHeight) {
            stickyHeader.classList.add("sticky");
        } else {
            stickyHeader.classList.remove("sticky");
        }
    }
    
    window.addEventListener("scroll", scrollWindowHandler);

});