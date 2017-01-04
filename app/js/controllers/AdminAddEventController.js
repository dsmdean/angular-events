'use strict';

eventsApp.controller('AdminAddEventController',
    function AdminAddEventController($scope, eventData) {
        $scope.event = {};
        $scope.defaultImg = "http://www.freelancedesignerindia.com/wp-content/uploads/2015/02/angular-js-swap-ng-src-attributes-img-tag-660x330.jpg";

        $scope.saveEvent = function(event) {
            eventData.save(event)
                .$promise
                .then(
                    function(response) {
                        console.log('success', response);
                    }
                )
                .catch(
                    function(response) {
                        console.log('failiure', response);
                    }
                );
        };
    }
);