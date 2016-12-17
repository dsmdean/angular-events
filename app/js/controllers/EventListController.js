'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, eventData) {
        
        //$scope.events = $route.current.locals.events;
        $scope.events = eventData.getAllEvents();
    }
);