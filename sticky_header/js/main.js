"use strict";

window.addEventListener('load', function() {

    var stickyHeader = document.getElementById("sticky-header"),
        beforeHeaderSection = document.querySelector(".before-header-section"),
        afterHeaderSection = document.querySelector(".after-header-section"),
        refPoint = stickyHeader.offsetTop;

    function scrollWindowHandler() {
        if (window.pageYOffset >= beforeHeaderSection.clientHeight) {
            stickyHeader.classList.add("sticky");
            afterHeaderSection.style.top = stickyHeader.clientHeight + "px";
        } else {
            stickyHeader.classList.remove("sticky");
            afterHeaderSection.style.top = "0";
        }
    }
    
    window.addEventListener("scroll", scrollWindowHandler);

});