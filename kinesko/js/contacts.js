/**
 * Created by glalex on 20.07.2017.
 */

'use strict';

// determine users coordinates - start *************************************************
var userCurrentPos;
var isGeolocationActive = false;
var geoOptions = {
    timeout: 10 * 1000
};

var geoSuccess = function(position) {
    // userCurrentPos = position;
    // console.log(userCurrentPos);
    isGeolocationActive = true;
    userCurrentPos = {lat: position.coords.latitude, lng: position.coords.longitude};

};
var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    isGeolocationActive = false;
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
// determine users coordinates - end ***************************************************

var kievMap;
var moscowMap;

var myLatLngKiev = {lat: 50.453122, lng: 30.525794};
var myLatLngMoscow = {lat: 55.752873, lng: 37.599039};

var kineskoStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "20"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": "-49"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "15"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "10"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "10"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "weight": "0.01"
            },
            {
                "color": "#ffdd00"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "11"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "-100"
            }
        ]
    }
]

function initMap() {

    var kievMapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: myLatLngKiev, // Трехсвятительская 5

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: kineskoStyles
    };

    var moscowMapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: myLatLngMoscow, // Новый Арбат

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: kineskoStyles
    };

    kievMap = new google.maps.Map(document.getElementById('kiev-map'), kievMapOptions);

    var kievMarker = new google.maps.Marker({
        position: myLatLngKiev,
        map: kievMap,
        title: "KOLORO in Kiev"
    });
    kievMarker.setMap(kievMap);

    moscowMap = new google.maps.Map(document.getElementById('moscow-map'), moscowMapOptions);

    var moscowMarker = new google.maps.Marker({
        position: myLatLngMoscow,
        map: moscowMap,
        title: "KOLORO in Moscow"
    });
    moscowMarker.setMap(moscowMap);
}

//  routings starts ******************************************************
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
//    directionsDisplay.setMap(kievMap);

function calcRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}
// routings ends ************************************************************


window.addEventListener('load', function() {

    // var kineskoMaps = $('.maps-container .kinesko-map');
    // var contactsMenuItems = $('.contacts-menu li');
    // var tabPanel = $('.tab-panel');
    // var tabPanes = $('.tab-panel .tab-pane');
    // var closeContactsBtns = $('.fly-block .close-contacts-btn');
    //
    // $(contactsMenuItems).click(function (e) {
    //     e.preventDefault();
    //
    //     if (!$(this).hasClass("active")) {
    //         $(contactsMenuItems).removeClass("active");
    //         $(this).addClass("active");
    //
    //         $(koloroMaps).toggleClass("active");
    //         $(tabPanes).toggleClass("active");
    //
    //         $(tabPanel).slideDown();
    //         $(closeContactsBtns).children().addClass("icon-cross-yellow");
    //         $(closeContactsBtns).children().removeClass("icon-arrow-down-yellow");
    //
    //         initMap();
    //     } else {
    //         $(tabPanel).slideDown();
    //         $(closeContactsBtns).children().addClass("icon-cross-yellow");
    //         $(closeContactsBtns).children().removeClass("icon-arrow-down-yellow");
    //     }
    //
    // });
    //
    // // contacts on map logic starts
    // $(closeContactsBtns).click(function() {
    //     $(tabPanel).slideToggle();
    //     $(this).children().toggleClass("icon-cross-yellow icon-arrow-down-yellow");
    // });
    // // contacts on map logic ends
    //
    // start of turn on\off map zoom
    $(".maska").on("click", function (e) {
        e.stopPropagation();
        $(".maska").css("z-index", "-1");
    });
    $("div:not('#YMapsID')").on("click", function (e) {
        // e.stopPropagation();
        $(".maska").css("z-index", "2");
    });
    // end of turn on\off map zoom
    //
    //
    // $(".route-btn").on("click", function (event) {
    //     event.preventDefault();
    //
    //     if (isGeolocationActive) {
    //         if($(".tab-panel .kiev").hasClass("active")) {
    //             directionsDisplay.setMap(kievMap);
    //             calcRoute(userCurrentPos, myLatLngKiev);
    //         } else if($(".tab-panel .moscow").hasClass("active")) {
    //             directionsDisplay.setMap(moscowMap);
    //             calcRoute(userCurrentPos, myLatLngMoscow);
    //         }
    //         $(tabPanel).slideUp();
    //         $(closeContactsBtns).children().toggleClass("icon-cross-yellow icon-arrow-down-yellow");
    //     } else {
    //         alert("Please, enable access to your geo-location! Then reload the page!!!");
    //     }
    //
    // });
    //

    var contactsSlider = $('.contacts-slider');

    $(contactsSlider).owlCarousel({
        loop:true,
        margin:1,
        nav:false,
        items: 1,

        autoplay:false,
        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:4000, //Время смены слайда
        autoplayHoverPause:false,

        onInitialized: function (event) {
            // alert("Hello!");
            // $('#preloader').fadeOut(10);
        }
    });

    // Go to the next item
    $('.slider-btn-cont .arrow-left-btn').click(function() {
        $(contactsSlider).trigger('prev.owl.carousel');
    });
    // Go to the previous item
    $('.slider-btn-cont .arrow-right-btn').click(function() {
        $(contactsSlider).trigger('next.owl.carousel');
    });



    initMap(); // initial call

    var writeBtnInner = $(".write-btn-cont .write-btn-inner"),
        writeBtn = $(".write-btn-cont .write-btn"),
        writeUsForm = $(".write-us-form"),
        closeFormBtn = $(".write-us-form .close-btn");

    $(writeBtn).on("click", function(event) {
        event.preventDefault();

        $(writeBtnInner).removeClass("flipInX").addClass("flipOutX").fadeOut();
        $(writeUsForm).removeClass("flipOutX").addClass("visible flipInX");
    });

    $(closeFormBtn).on("click", function(event) {
        event.preventDefault();

        $(writeBtnInner).removeClass("flipOutX").addClass("flipInX").fadeIn();
        $(writeUsForm).removeClass("visible flipInX").addClass("flipOutX");
    });


    // *****************    EVENT HANDLERS    *******************
    function resizeWindowHandler(event) {
        if (window.innerWidth < 768) {
            $(writeBtnInner).removeClass("flipInX flipOutX");
            $(writeUsForm).removeClass("flipInX flipOutX");
        } else {

        }
    }

    // ***************** REGISTER EVENT HANDLERS *******************

    window.addEventListener('resize', resizeWindowHandler);





});