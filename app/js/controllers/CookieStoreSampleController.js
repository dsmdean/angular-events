'use strict';

eventsApp.controller('CookieSampleController',
    function CookieSampleController($scope, $locale, $cookieStore) {
        
        $scope.event = {id: 1, name:"NY Event"};

        $scope.saveEventToCookie = function(event) {
            $cookieStore.put('event', event);
        };

        $scope.getEventFromCookie = function() {
            console.log($cookieStore.get('event'));
        };

        $scope.removeEventCookie = function() {
            $cookieStore.remove('event');
        };
        
    }
);