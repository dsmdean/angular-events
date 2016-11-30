'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $route, eventData) {
        
        $scope.events = $route.current.locals.events;
    }
);