'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $route, $location, eventData, ngDialog) {

        $scope.sortorder = 'name';
        $scope.events = $route.current.locals.events;
    }
);