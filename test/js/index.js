/**
 * Created by glalex on 20.07.2017.
 */

$(function () {
    var sectionOurWorks = document.querySelector(".our-works"),
        achievmentsCont = document.querySelector(".achievments-cont");

    var skillsFirstFlag = true;
    var skillDiagrams = document.querySelectorAll('.circle-diagram');

    // **************************       FUNCTIONS       ***************************************************

    function circleDiagramDraw(canvas, percents, textColor) {

        var degrees = 360 * percents * 0.01;

        var ctx = canvas.getContext("2d");

        var temp = getComputedStyle(canvas, "width");

        var width = canvas.width;
        var height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 20;
        ctx.arc(width/2, height/2, 140, 0, Math.PI*2, false);
        ctx.stroke();

        var radians = degrees * Math.PI / 180;
        ctx.beginPath();
        ctx.strokeStyle = "#f4bd00";
        ctx.lineWidth = 20;
        ctx.arc(width/2, height/2, 140, 0 + 90*Math.PI/180, radians + 90*Math.PI/180, false);
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.font = "normal 72px BebasNeueBold";
        var text = Math.floor(degrees/360*100) + "%";
        var text_width = ctx.measureText(text).width;
        var text_height = ctx.measureText(text).height;
        ctx.fillText(text, width/2 - text_width/2, width/2 + 20);
    }


    function drawCircleDiagram(elem, currVal, textColor) {

        if(currVal < +elem.dataset.percents) {
            circleDiagramDraw(elem, currVal + 1, textColor);
            setTimeout(drawCircleDiagram, 3000 / +elem.dataset.percents, elem, currVal + 1, textColor);
        }

    }

    // *******************************         END OF FUNCTIONS       ************************************

    // ***************************************************
    resizeWindowHandler();
    scrollWindowHandler(); // initial call!!!
    // ***************************************************

    // *****************     EVENT HANDLERS    *******************

    function resizeWindowHandler(event) {
        // if (window.innerWidth < mobileViewWidth) {
        //     isMobileViewFlag = true;
        //
        //     $(siteNav).css("display", "none");
        // } else {
        //     isMobileViewFlag = false;
        //
        //     if (achievmentsSectionFirstScroll) {
        //         $(achievmentCounters).text("0");
        //     }
        //
        //     $(siteNav).css("display", "block");
        // }
    }

    function scrollWindowHandler(event) {
        var tempOffset;


        if (window.innerWidth < 768) {
            tempOffset = window.innerHeight / 3;
        } else {
            tempOffset = window.innerHeight / 1.4;
        }

        var	currentPosition = document.body.scrollTop ?
            (document.body.scrollTop + tempOffset) :
            (document.documentElement.scrollTop + tempOffset);

        if (
            (currentPosition > (sectionOurWorks.offsetTop + achievmentsCont.offsetTop)) &&
            (currentPosition < (sectionOurWorks.offsetTop + achievmentsCont.offsetTop + achievmentsCont.clientHeight))
        ) {

            if (skillsFirstFlag) {
                skillsFirstFlag = false;

                drawCircleDiagram(skillDiagrams[0], 0, "#000");
                drawCircleDiagram(skillDiagrams[1], 0, "#fff");
            }
        }


        // scrollPreviousPosition = currentPosition;

    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('scroll', scrollWindowHandler);
    window.addEventListener('resize', resizeWindowHandler);

    // *************************************************************


    // for (var i = 0; i < skillDiagrams.length; i++) {
    //     drawCircleDiagram(skillDiagrams[i], 0);
    // }

    // drawCircleDiagram(skillDiagrams[0], 0, "#000");
    // drawCircleDiagram(skillDiagrams[1], 0, "#fff");

});