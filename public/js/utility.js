app.service('GMap', function () {
    this.initMap = function (address, elementId) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
                var map = new google.maps.Map(document.getElementById(elementId), {
                    zoom: 15,
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    }
                });
                
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                console.log('Map rendered')
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
});


/*
//link solution: http://stackoverflow.com/questions/17959563/how-do-i-get-basic-auth-working-in-angularjs

var app = angular.module('BasicAuth', []);
app.config(function($httpProvider) {    
});

*/

