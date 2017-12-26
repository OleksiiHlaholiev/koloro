/**
 * Created by glalex on 26.07.2017.
 */

//------------   START OF GLOBAL VARIABLES AND FUNCTIONS   -------------
var successFormTimer,
    kineskoForms = $(".kinesko-form");

function kineskoFormShow(kineskoForm) {
    $(kineskoForm).addClass("active").fadeIn(400);
    $("html, body").addClass("scroll-lock");
    // $("html, body").addClass("html-body-scroll-lock");
    // $("body").addClass("body-scroll-lock");
}

function kineskoFormHide(kineskoForm) {
    $(kineskoForm).removeClass("active").fadeOut(400);
    $("html, body").removeClass("scroll-lock");
    // $("html, body").removeClass("html-body-scroll-lock");
    // $("body").removeClass("body-scroll-lock");
}

function successFormShow() {
    var timeToShow = 7000;
    kineskoFormShow(".success-form");

    successFormTimer = setTimeout(function () {
        kineskoFormHide(".success-form");
        clearTimeout(successFormTimer);
    }, timeToShow);
}
//------------   end OF GLOBAL VARIABLES AND FUNCTIONS   -------------

// start of order-form logic
$(function () {
    var orderForm = document.querySelector(".order-form");

    $(".order-form-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        kineskoFormShow(orderForm);
    });

    $(".order-form .close-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        kineskoFormHide(orderForm);
    });

    // form-handler
    $(orderForm).submit(function(event) { //устанавливаем событие отправки для формы
        event.preventDefault();
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/", //путь до php фаила отправителя
            data: form_data,
            success: function () {
                //код в этом блоке выполняется при успешной отправке сообщения
                // alert("Ваше сообщение отправлено!");
                orderForm.reset();
                successFormShow();
                kineskoFormHide(orderForm);
            },
            error: function () {
                alert("Произошла ошибка при отправке...( Попробуйте еще раз!");
            }
        });
    });

    function modalClose (e) {
        if ( e.keyCode === 27 ) {
            // close forms on ESC
            if($(orderForm).hasClass("active")) {
                kineskoFormHide(orderForm);
            }
        }
    }

    document.addEventListener('keydown', modalClose);
});
// end of order-form logic

// ************************************************************************************************************ //

// start of callback-form logic
$(function () {
    var callbackForm = document.querySelector(".callback-form");

    $(".callback-form-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        kineskoFormShow(callbackForm);
    });

    $(".callback-form .close-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        kineskoFormHide(callbackForm);
    });

    // form-handler
    $(callbackForm).submit(function(event) { //устанавливаем событие отправки для формы
        event.preventDefault();
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/", //путь до php фаила отправителя
            data: form_data,
            success: function () {
                //код в этом блоке выполняется при успешной отправке сообщения
                // alert("Ваше сообщение отправлено!");
                callbackForm.reset();
                successFormShow();
                kineskoFormHide(callbackForm);
            },
            error: function () {
                alert("Произошла ошибка при отправке...( Попробуйте еще раз!");
            }
        });
    });

    function modalClose (e) {
        if ( e.keyCode === 27 ) {
            // close forms on ESC
            if($(callbackForm).hasClass("active")) {
                kineskoFormHide(callbackForm);
            }
        }
    }

    document.addEventListener('keydown', modalClose);
});
// end of callback-form logic

// start of blog-subscribe-form logic
$(function () {
    var blogSubscribeForm = document.querySelector(".blog-subscribe-form");

    // form-handler
    $(blogSubscribeForm).submit(function(event) { //устанавливаем событие отправки для формы
        event.preventDefault();
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/", //путь до php фаила отправителя
            data: form_data,
            success: function () {
                //код в этом блоке выполняется при успешной отправке сообщения
                // alert("Ваше сообщение отправлено!");
                blogSubscribeForm.reset();
                successFormShow();
            },
            error: function () {
                alert("Произошла ошибка при отправке...( Попробуйте еще раз!");
            }
        });
    });

});
// end of blog-subscribe-form logic

// ************************************************************************************************************ //

// start of success-form logic
$(function () {
    var successForm = document.querySelector(".success-form");

    $(".success-form .success-close-btn, .success-form .close-btn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // to avoid inherit click events
        kineskoFormHide(successForm);
        if (successFormTimer) {
            clearTimeout(successFormTimer);
        }
    });

    function modalClose (e) {
        if ( e.keyCode === 27 ) {
            // close forms on ESC
            if($(successForm).hasClass("active")) {
                kineskoFormHide(successForm);
            }
        }
    }

    document.addEventListener('keydown', modalClose);
});
// end of of success-form logic

$(function () {
    $("body").click(function(event) {
        // if($(kineskoForms).hasClass("active")) {
        //     alert("YES!");
        // }
        if(!$(event.target).closest($(".gl-container")).length &&
            $(kineskoForms).hasClass("active")) {
                event.preventDefault();
                kineskoFormHide(kineskoForms);
        }
    });
});

// ************************************************************************************************************ //