'use strict';

eventsApp.controller('MainMenuController',
    function MainMenuController($scope, $location) {

        $scope.createEvent = function() {
            console.log('');

            $location.url('newEvent');
        };
    }
);